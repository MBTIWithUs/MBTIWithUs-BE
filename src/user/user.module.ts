import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserMapper } from './util/user.mapper';
import { UserInterceptor } from './interceptor/user.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [UserService, UserMapper, UserInterceptor],
  exports: [
    UserService, UserInterceptor
  ]
})
export class UserModule {}
