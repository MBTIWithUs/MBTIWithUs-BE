import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Inject, forwardRef, NotFoundException } from '@nestjs/common';
import { MbtilogService } from './mbtilog.service';
import { CreateMbtilogDto } from './dto/create-mbtilog.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { MbtiresultService } from 'src/mbtiresult/mbtiresult.service';

@Controller('mbti/log')
export class MbtilogController {
  constructor(
    private readonly mbtilogService: MbtilogService,
    @Inject(forwardRef(() => MbtiresultService))
    private readonly mbtiresultService: MbtiresultService
    ) {}

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async find(@Param('id') id: string, @Request() req) {
    let user: User = req.user;
    let mbtiresult = await this.mbtiresultService.findOne(+id);
    if (user.id == mbtiresult.targetId && !Boolean(mbtiresult.targetDeletedAt)) {
      return await this.mbtilogService.findByResultId(+id);
    }
    else if (user.id == mbtiresult.writerId && !Boolean(mbtiresult.writerDeletedAt)) {
      return await this.mbtilogService.findByResultId(+id);
    }
    else {
      throw new NotFoundException("not found.")
    }
  }
}
