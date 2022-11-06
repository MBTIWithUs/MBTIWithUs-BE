import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { JwtConfig } from 'src/config/entities/jwt.config.entity';
import { User } from 'src/user/entities/user.entity';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR

const ACCESS_TOKEN_EXPIRES_IN = 3 * HOUR;
const REFRESH_TOKEN_EXPIRES_IN = 90 * DAY;

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

const jwtConfig = new JwtConfig();

type JwtToken = {
    expiresIn: string,
    value: string
}

@Injectable()
export class JwtService {

    publishAccessToken(user: User): JwtToken {
        let token: JwtToken = {
            expiresIn: ACCESS_TOKEN_EXPIRES_IN + "",
            value: jwt.sign({ id: user.id, type: ACCESS_TOKEN}, jwtConfig.accessTokenSecret, {expiresIn: ACCESS_TOKEN_EXPIRES_IN})
        };
        return token;
    }

    publishRefreshToken(user: User): JwtToken {
        let token: JwtToken = {
            expiresIn: REFRESH_TOKEN_EXPIRES_IN + "",
            value: jwt.sign({ id: user.id, type: REFRESH_TOKEN}, jwtConfig.refreshTokenSecret, {expiresIn: REFRESH_TOKEN_EXPIRES_IN})
        };
        return token;
    }
}
