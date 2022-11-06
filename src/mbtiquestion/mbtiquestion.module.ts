import { Module } from '@nestjs/common';
import { MbtiquestionService } from './mbtiquestion.service';
import { MbtiquestionController } from './mbtiquestion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mbtiquestion } from './entities/mbtiquestion.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mbtiquestion]),
    UserModule
  ],
  controllers: [MbtiquestionController],
  providers: [MbtiquestionService],
  exports: [MbtiquestionService]
})
export class MbtiquestionModule {}
