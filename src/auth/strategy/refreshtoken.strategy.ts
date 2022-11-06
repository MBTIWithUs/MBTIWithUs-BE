import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfig } from "src/config/entities/jwt.config.entity";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

const jwtConfig = new JwtConfig();

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {

    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConfig.refreshTokenSecret,
        });
    }

    async validate(payload: any, done) {
        if (payload.type != 'refresh_token') {
            done(new UnauthorizedException('It is not refresh token.'), false);
        }

        try {
            const id = payload.id;
            let user: User = await this.userService.findOne(id);
            if (payload.value == user.refreshToken) {
                done(null, user);
            }
            else {
                done(new UnauthorizedException('It is refresh token but not valid.'), false);
            }
            done(null, user);
        } catch (error) {
            done(error, false);
        }
    }  
}