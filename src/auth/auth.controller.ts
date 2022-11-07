import { HttpService } from '@nestjs/axios';
import { BadRequestException, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AxiosRequestConfig } from 'axios';
import { lastValueFrom } from 'rxjs';
import { KakaoConfig } from 'src/config/entities/kakao.config.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';

const kakaoConfig = new KakaoConfig();

const qs = require('qs');

const KAUTH_HOST_NAME = 'https://kauth.kakao.com';
const KAPI_HOST_NAME = 'https://kapi.kakao.com';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly httpService: HttpService
    ) {}

    @Post('jwt/accessToken')
    @UseGuards(AuthGuard('jwt-refresh'))
    async findAccessToken(@Req() req) {
        let user: User = req.user;
        let tokens = await this.authService.getTokens(user);
        console.log(tokens);
        return tokens;
    }

    @Get('kakao')
    @UseGuards(AuthGuard('kakao'))
    async kakao() {}

    @Get('kakao/authorize')
    @UseGuards(AuthGuard('kakao-authorize'))
    async kakaoAuthorize() {}

    @Post('kakao/token')
    async getTokens(@Req() req) {
        let data = {
            grant_type: "authorization_code",
            client_id: kakaoConfig.restApiKey,
            redirect_url: kakaoConfig.redirectUrl,
            code: req.query.code
        };

        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(data),
            url: KAUTH_HOST_NAME + "/oauth/token"
        }

        try {
            let value = await lastValueFrom(
                this.httpService.request(options)
            );
            let userProfile = await this.getUserProfile(value.data.access_token);
    
            const nickname = userProfile.properties.nickname;
            const socialId = userProfile.id;
            const provider = 'kakao';
            const profileImageUrl = userProfile.properties.profile_image;
    
            let user = await this.authService.processUser(nickname, socialId, provider, profileImageUrl);
            return await this.authService.getTokens(user);
        } catch (error) {
            let status = error.response.status;
            let description = error.response.data.error_description;
            switch (error.response.status) {
                case 400: throw new BadRequestException(description); break;
                default: throw error;
            }
        }
    }

    async getUserProfile(accessToken) {
        let data = {
            secure_resource: true,
            property_keys: [
                'kakao_account.',
                'properties.'
            ],
        }
        let options: AxiosRequestConfig = {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken,
            },
            data: qs.stringify(data),
            url: KAPI_HOST_NAME + "/v2/user/me"
        };
    
        try {
            let value = await lastValueFrom(
                this.httpService.request(options)
            );
            return value.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
