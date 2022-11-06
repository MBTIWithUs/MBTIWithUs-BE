import { IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    // id: number;

    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(64)
    nickname: string;
    @IsNotEmpty()
    socialId: string;
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(64)
    provider: string;

    @IsOptional()
    @MaxLength(256)
    profileImageUrl: string;
}
