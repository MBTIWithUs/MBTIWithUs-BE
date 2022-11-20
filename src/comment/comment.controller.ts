import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Put, BadRequestException, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Community } from 'src/community/entities/community.entity';
import { User } from 'src/user/entities/user.entity';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('community/comment')
@UseGuards(AuthGuard('jwt'))
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto, @Request() req): Promise<Community> {
    let user: User = req.user;
    if (Boolean(createCommentDto.parentCommentId)) {
      let parentComment = await this.commentService.findOne(createCommentDto.parentCommentId);
      if (Boolean(parentComment.parentCommentId)) throw new BadRequestException("parentCommentId is not valid.");
    }
    return await this.commentService.create(createCommentDto, user.id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto, @Request() req): Promise<Community> {
    let user: User = req.user;
    let comment: Comment = await this.commentService.findOne(+id);
    if (user.id != comment.creatorId) {
      throw new UnauthorizedException("Put method is not allowed.");
    }
    return await this.commentService.update(+id, updateCommentDto, user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<Community> {
    let user: User = req.user;
    let comment: Comment = await this.commentService.findOne(+id);
    if (user.id != comment.creatorId) {
      throw new UnauthorizedException("Delete method is not allowed.");
    }
    return await this.commentService.remove(+id, user.id);
  }

  @Post(':id/like')
  async toggleLike(@Param('id') id: string, @Request() req): Promise<any> {
    let user: User = req.user;
    return await this.commentService.toggleLike(+id, user.id);
  }
}
