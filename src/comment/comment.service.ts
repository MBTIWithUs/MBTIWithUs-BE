import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommunityService } from 'src/community/community.service';
import { Community } from 'src/community/entities/community.entity';
import { IsNull, Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { CommentLike } from './entities/comment.like.entity';
import { CommentMapper } from './util/comment.mapper';

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
    @InjectRepository(CommentLike) private readonly commentLikeRepository: Repository<CommentLike>,
    @Inject(forwardRef(() => CommunityService))
    private readonly communityService: CommunityService,
    private readonly commentMapper: CommentMapper
  ) {}

  async toggleLike(commentId: number, userId: number):  Promise<any> {
    let like: CommentLike = await this.commentLikeRepository.findOneBy({
      commentId: commentId, userId: userId
    });
    if (Boolean(like)) {
      like.isLiked = like.isLiked == true ? false : true;
      await this.commentLikeRepository.save(like);
    }
    else {
      like = new CommentLike();
      like.commentId = commentId;
      like.userId = userId;
      like.isLiked = true;
      await this.commentLikeRepository.save(like);
    }
    let comment: Comment = await this.findOne(like.commentId);
    comment.likes = await this.findLikeCount(like.commentId);
    await this.commentRepository.save(comment);
    return like;
  }

  async findLikeCount(commentId: number): Promise<number> {
    let count: number = await this.commentLikeRepository.countBy({
      commentId: commentId, isLiked: true
    });
    return count;
  }

  async findIsLiked(commentId: number, userId: number): Promise<boolean> {
    let like: CommentLike = await this.commentLikeRepository.findOneBy({
      commentId: commentId, userId: userId
    });
    if (like == null) return false;
    return like.isLiked;
  }

  async create(createCommentDto: CreateCommentDto, creatorId: number): Promise<Community> {
    let community: Community = await this.communityService.findOneNoViewsIncreaseWithoutLikeRelations(createCommentDto.communityId);
    let comment: Comment = this.commentMapper.createDtoToEntity(createCommentDto);
    comment.creatorId = creatorId;
    await this.commentRepository.save(comment);
    return await this.communityService.findOneNoViewsIncrease(comment.community.id, creatorId);
  }

  async findOne(id: number) {
    return await this.commentRepository.findOneByOrFail({
      id: id, deletedAt: IsNull()
    });
  }

  async findCommunityId(id: number): Promise<number> {
    let comment: Comment = await this.commentRepository.findOneOrFail({
      where: {
        id: id, deletedAt: IsNull()
      },
      relations: {
        community: true
      }
    });
    return comment.community.id;
  }

  async update(id: number, updateCommentDto: UpdateCommentDto, creatorId: number): Promise<Community> {
    let comment: Comment = await this.findOne(id);
    this.commentMapper.updateDtoToEntity(updateCommentDto, comment);
    await this.commentRepository.save(comment);
    let communityId = await this.findCommunityId(id);
    return await this.communityService.findOneNoViewsIncrease(communityId, creatorId);
  }

  async remove(id: number, creatorId: number): Promise<Community> {
    let comment: Comment = await this.findOne(id);
    let communityId = await this.findCommunityId(id);
    await this.commentRepository.delete(comment.id);
    console.log(communityId);
    return await this.communityService.findOneNoViewsIncrease(communityId, creatorId);
  }
}