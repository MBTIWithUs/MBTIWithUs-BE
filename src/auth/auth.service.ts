import { Injectable } from '@nestjs/common';
import { JwtService } from 'src/jwt/jwt.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async processUser(nickname: string, socialId: string, provider: string, profileImageUrl: string | null | undefined): Promise<User> {
        try {
            let user: User = await this.userService.findBySocialIdAndProvider(socialId, provider);
            let updateUserDto = new UpdateUserDto();
            updateUserDto.nickname = nickname;
            updateUserDto.profileImageUrl = profileImageUrl;
            let updated: User = await this.userService.update(user.id, updateUserDto);
            return updated;
        } catch (error) {
            let createUserDto: CreateUserDto = new CreateUserDto();
            createUserDto.nickname = nickname;
            createUserDto.socialId = socialId;
            createUserDto.provider = provider;
            createUserDto.profileImageUrl = profileImageUrl;
            let user: User = await this.userService.create(createUserDto);
            return user;
        }
    }

    async getTokens(user: User) {
        let accessToken = await this.jwtService.publishAccessToken(user);
        let refreshToken = await this.jwtService.publishRefreshToken(user);
        let metadata = await this.getMetadata();
        return Object.assign({ accessToken: accessToken }, { refreshToken: refreshToken }, metadata);
    }

    async getAccessToken(user: User) {
        let accessToken = this.jwtService.publishAccessToken(user);
        let metadata = this.getMetadata();
        return Object.assign({ accessToken: accessToken }, metadata);
    }

    async getMetadata() {
        return {
            serverCurrentTime: new Date().getTime()
        };
    }
}
