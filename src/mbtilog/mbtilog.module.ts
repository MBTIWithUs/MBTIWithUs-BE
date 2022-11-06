import { forwardRef, Module } from '@nestjs/common';
import { MbtilogService } from './mbtilog.service';
import { MbtilogController } from './mbtilog.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Mbtilog } from './entities/mbtilog.entity';
import { MbtilogMapper } from './util/mbtilog.mapper';
import { MbtilogInterceptor } from './interceptor/mbtilog.interceptor';
import { MbtiresultModule } from 'src/mbtiresult/mbtiresult.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mbtilog]),
    forwardRef(() => MbtiresultModule)
  ],
  controllers: [MbtilogController],
  providers: [MbtilogService, MbtilogMapper, MbtilogInterceptor],
  exports: [MbtilogService, MbtilogInterceptor]
})
export class MbtilogModule {}
