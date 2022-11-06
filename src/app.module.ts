import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MbtiquestionModule } from './mbtiquestion/mbtiquestion.module';
import { MbtiresultModule } from './mbtiresult/mbtiresult.module';
import { MbtilogModule } from './mbtilog/mbtilog.module';
import { CommunityModule } from './community/community.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { DatabaseConfig } from './config/entities/database.config.entity';
import { JwtModule } from './jwt/jwt.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './user/interceptor/user.interceptor';
import { ResponseInterceptor } from './global/interceptor/response.interceptor';
import { RequestInterceptor } from './global/interceptor/request.interceptor';
import { EntityNotFoundFilter } from './global/interceptor/exception/entitynotfound.exceptionfilter';

const databaseConfig = new DatabaseConfig();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: databaseConfig.type,
      host: databaseConfig.host,
      port: databaseConfig.port,
      username: databaseConfig.username,
      password: databaseConfig.password,
      database: databaseConfig.database,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    UserModule, 
    MbtiquestionModule, 
    MbtiresultModule, 
    MbtilogModule, 
    CommunityModule, 
    AuthModule, 
    JwtModule,
  ],

  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundFilter
    },
  ]
})

export class AppModule {}
