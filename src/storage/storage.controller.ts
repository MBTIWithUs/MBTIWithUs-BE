import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Redirect, UseGuards } from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Storage } from './entities/storage.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(AuthGuard('jwt'))
  async create(@UploadedFile() file) {
    let storage: Storage = await this.storageService.create(file);
    return "/api/v1/storage/" + storage.id;
  }

  @Get(':id')
  @Redirect()
  async findOne(@Param('id') id: string) {
    let storage: Storage = await this.storageService.findOne(+id);
    return {
      url: storage.url
    };
  }
}
