import { Controller, Get, Post, Body, Patch, Param, Delete, Request, Query, DefaultValuePipe, ParseIntPipe, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Pagination } from 'nestjs-typeorm-paginate';
import { User } from 'src/user/entities/user.entity';
import { CommunityService } from './community.service';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './entities/community.entity';
import { CommunitySummary } from './entities/community.summary.entity';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createCommunityDto: CreateCommunityDto, @Request() req): Promise<Community> {
    let user: User = req.user;
    return await this.communityService.create(createCommunityDto, user.id);
  }

  @Get("/search")
  async findAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Request() req,
  ): Promise<Pagination<CommunitySummary>> {
    limit = limit > 100 ? 100 : limit;
    let user: User | null | undefined = req.user;
    console.log(page, limit, user);
    if (Boolean(user)) {
      return await this.communityService.findAll({
        page, limit, 
        route: "/community/search",
      }, user.id);
    }
    else {
      return await this.communityService.findAllWithoutLikeRelations({
        page, limit, 
        route: "/community/search",
      });
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req): Promise<any> {
    let user: User | null | undefined = req.user;
    console.log(id, user);
    if (Boolean(user)) {
      return await this.communityService.findOne(+id, user.id);
    }
    else {
      return await this.communityService.findOneWithoutLikeRelations(+id);
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id: string, @Body() updateCommunityDto: UpdateCommunityDto, @Request() req): Promise<Community> {
    let user: User = req.user;
    let community: Community = await this.communityService.findOne(+id, user.id);
    if (user.id != community.creatorId) {
      throw new UnauthorizedException("Put method not allowed.");
    }
    return await this.communityService.update(+id, updateCommunityDto, user.id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id') id: string, @Request() req): Promise<void> {
    let user: User = req.user;
    let community: Community = await this.communityService.findOneNoViewsIncrease(+id, user.id);
    if (user.id != community.creatorId) {
      throw new UnauthorizedException("Delete method not allowed.");
    }
    await this.communityService.remove(+id, user.id);
  }

  @Post(':id/like')
  @UseGuards(AuthGuard('jwt'))
  async toggleLike(@Param('id') id: string, @Request() req): Promise<any> {
    let user: User = req.user;
    return await this.communityService.toggleLike(+id, user.id);
  }
}
