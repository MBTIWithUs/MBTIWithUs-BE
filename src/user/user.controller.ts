import { Controller, Get, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  findOne(@Req() req) {
    let user: User = req.user;
    return this.userService.findOne(user.id);
  }

  @Patch()
  @UseGuards(AuthGuard('jwt'))
  update(@Body() updateUserDto: UpdateUserDto, @Req() req) {
    let user: User = req.user;
    return this.userService.update(user.id, updateUserDto);
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  remove(@Req() req) {
    let user: User = req.user;
    return this.userService.remove(user.id);
  }
}
