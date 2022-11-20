import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, NotFoundException, UseInterceptors, Put, UnauthorizedException } from '@nestjs/common';
import { MbtiresultService } from './mbtiresult.service';
import { Mbtiresult } from './entities/mbtiresult.entity';
import { CreateMbtiresultQuestionsDto } from './dto/create-mbtiresult-questions.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { UpdateMbtiresultQuestionsDto } from './dto/update-mbtiresult-questions.dto';
import { UserService } from 'src/user/user.service';

@Controller('mbti/result')
@UseGuards(AuthGuard('jwt'))
export class MbtiresultController {
  constructor(
    private readonly mbtiresultService: MbtiresultService,
    private readonly userService: UserService
    ) {}

  @Post()
  async create(@Body() createMbtiresultQuestionsDto: CreateMbtiresultQuestionsDto, @Request() req): Promise<Mbtiresult> {
    let targetId = createMbtiresultQuestionsDto.targetId;
    let targetUser = await this.userService.findOne(targetId);
    let writerUser: User = req.user;
    return await this.mbtiresultService.create(createMbtiresultQuestionsDto, +writerUser.id);
  }

  @Get(':id')
  async findOneFromTarget(@Param('id') id: string, @Request() req): Promise<Mbtiresult> {
    let user: User = req.user;
    let mbtiresult: Mbtiresult = await this.mbtiresultService.findOne(+id);

    if (user.id == mbtiresult.targetId && !Boolean(mbtiresult.targetDeletedAt)) {
      return mbtiresult;
    }
    else if (user.id == mbtiresult.writerId && !Boolean(mbtiresult.writerDeletedAt)) {
      return mbtiresult;
    }
    else {
      throw new NotFoundException("not found.")
    }
  }

  @Get('recieved/all')
  async findByTargetId(@Request() req): Promise<Mbtiresult[]> {
    let user: User = req.user;
    return await this.mbtiresultService.findByTargetId(user.id);
  }

  @Get('sent/all')
  async findByWriterId(@Request() req): Promise<Mbtiresult[]> {
    let user: User = req.user;
    return await this.mbtiresultService.findByWriterId(user.id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateMbtiresultQuestionsDto: UpdateMbtiresultQuestionsDto, @Request() req): Promise<Mbtiresult> {
    let user: User = req.user;
    let mbtiresult: Mbtiresult = await this.mbtiresultService.findOne(+id);
    if (user.id != mbtiresult.writerId) {
      throw new UnauthorizedException("Put method not allowed.");
    }
    return await this.mbtiresultService.update(+id, updateMbtiresultQuestionsDto);
  }

  @Delete('target/:id')
  async removeOneFromTarget(@Param('id') id: string, @Request() req): Promise<void> {
    let user: User = req.user;
    let mbtiresult: Mbtiresult = await this.mbtiresultService.findOne(+id);
    if (user.id != mbtiresult.targetId) {
      throw new UnauthorizedException("Put method not allowed.");
    }
    await this.mbtiresultService.removeOneFromTarget(+id);
  }

  @Delete('writer/:id')
  async removeOneFromWriter(@Param('id') id: string, @Request() req): Promise<void> {
    let user: User = req.user;
    let mbtiresult: Mbtiresult = await this.mbtiresultService.findOne(+id);
    if (user.id != mbtiresult.writerId) {
      throw new UnauthorizedException("Put method not allowed.");
    }
    await this.mbtiresultService.removeOneFromWriter(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    let user: User = req.user;
    let mbtiresult = await this.mbtiresultService.findOne(+id);
    if (user.id == mbtiresult.targetId && !Boolean(mbtiresult.targetDeletedAt)) {
      await this.mbtiresultService.removeOneFromTarget(+id);
    }
    if (user.id == mbtiresult.writerId && !Boolean(mbtiresult.writerDeletedAt)) {
      await this.mbtiresultService.removeOneFromWriter(+id);
    }
    else {
      throw new NotFoundException("not found.");
    }
  }
}
