import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";
import { KakaoConfig } from "src/config/entities/kakao.config.entity";
import { User } from "src/user/entities/user.entity";
import { AuthService } from "../auth.service";

const kakaoConfig = new KakaoConfig();

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {

    constructor(private authService: AuthService) {
        super({
            clientID: kakaoConfig.restApiKey,
            callbackURL: kakaoConfig.redirectUrl
        });
    }

    async validate(accessToken, refreshToken, profile, done) {
        const nickname = profile.displayName;
        const socialId = profile.id;
        const provider = profile.provider;
        const profileImageUrl = profile.profile_image_url;

        try {
            let user: User = await this.authService.processUser(nickname, socialId, provider, profileImageUrl);
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }
}