import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { MbtiquestionService } from './mbtiquestion.service';

@Controller('mbti/question')
export class MbtiquestionController {
  constructor(
    private readonly mbtiquestionService: MbtiquestionService,
    private readonly userService: UserService
    ) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findByType(@Param('id') id: string, @Req() req) {
    let user: User = req.user;
    if (user.id == +id) {
      let questions = await this.mbtiquestionService.findByType(0);
      for (let q of questions) {
        q.question = q.question.replace(/<nickname>/g, user.nickname);
        q.leftAnswer = q.leftAnswer.replace(/<nickname>/g, user.nickname);
        q.rightAnswer = q.rightAnswer.replace(/<nickname>/g, user.nickname);
      }
      return questions;
    }
    else {
      let questions = await this.mbtiquestionService.findByType(1);
      let target = await this.userService.findOne(+id);
        for (let q of questions) {
          q.question = q.question.replace(/<nickname>/g, target.nickname);
          q.leftAnswer = q.leftAnswer.replace(/<nickname>/g, target.nickname);
          q.rightAnswer = q.rightAnswer.replace(/<nickname>/g, target.nickname);
        }
        return questions;
    }
  }
}
