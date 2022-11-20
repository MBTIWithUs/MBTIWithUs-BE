import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { UserModule } from 'src/user/user.module';
import { CommunityModule } from 'src/community/community.module';
import { CommentMapper } from './util/comment.mapper';
import { CommentLike } from './entities/comment.like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, CommentLike]),
    UserModule, forwardRef(() => CommunityModule)
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentMapper],
  exports: [
    CommentService
  ]
})
export class CommentModule {}
