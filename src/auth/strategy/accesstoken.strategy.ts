import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtConfig } from "src/config/entities/jwt.config.entity";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

const jwtConfig = new JwtConfig();

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(
        private readonly userService: UserService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: true,
            secretOrKey: jwtConfig.accessTokenSecret,
        });
    }

    async validate(payload: any, done) {
        if (payload.type != 'access_token') {
            done(new UnauthorizedException('It is not access token.'), false);
        }

        try {
            const id = payload.id;
            let user: User = await this.userService.findOne(id);
            done(null, user);
        } catch (error) {
            console.log(error);
            done(error, false);
        }
    }  
}