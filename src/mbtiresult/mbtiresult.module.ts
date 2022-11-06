import { forwardRef, Module } from '@nestjs/common';
import { MbtiresultService } from './mbtiresult.service';
import { MbtiresultController } from './mbtiresult.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mbtiresult } from './entities/mbtiresult.entity';
import { MbtiresultMapper } from './util/mbtiresult.mapper';
import { MbtilogModule } from 'src/mbtilog/mbtilog.module';
import { MbtiquestionModule } from 'src/mbtiquestion/mbtiquestion.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mbtiresult]),
    forwardRef(() => MbtilogModule),
    MbtiquestionModule,
    UserModule
  ],
  controllers: [MbtiresultController],
  providers: [MbtiresultService, MbtiresultMapper],
  exports: [MbtiresultService]
})
export class MbtiresultModule {}
