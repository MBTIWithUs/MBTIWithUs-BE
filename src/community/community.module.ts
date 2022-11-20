import { forwardRef, Module } from '@nestjs/common';
import { CommunityService } from './community.service';
import { CommunityController } from './community.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Community } from './entities/community.entity';
import { CommunitySummary } from './entities/community.summary.entity';
import { UserModule } from 'src/user/user.module';
import { CommunityMapper } from './util/community.mapper';
import { CommunityLike } from './entities/community.like.entity';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Community, CommunitySummary, CommunityLike]),
    UserModule, forwardRef(() => CommentModule)
  ],
  controllers: [CommunityController],
  providers: [CommunityService, CommunityMapper],
  exports: [
    CommunityService
  ]
})
export class CommunityModule {}
