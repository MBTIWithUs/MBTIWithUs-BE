import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { JwtModule } from 'src/jwt/jwt.module';
import { AccessTokenStrategy } from './strategy/accesstoken.strategy';
import { KakaoStrategy } from './strategy/kakao.strategy';
import { KakaoAuthorizeStrategy } from './strategy/kakaoauthorize.strategy';
import { RefreshTokenStrategy } from './strategy/refreshtoken.strategy';
import { AuthController } from './auth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    UserModule, JwtModule, HttpModule
  ],
  providers: [AuthService, AccessTokenStrategy, KakaoStrategy, KakaoAuthorizeStrategy, RefreshTokenStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
