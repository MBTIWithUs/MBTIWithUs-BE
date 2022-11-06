import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserMapper } from './util/user.mapper';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userMapper: UserMapper,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = this.userMapper.createDtoToEntity(createUserDto);
    let created: User = await this.userRepository.save(user);
    return created;
  }

  async findOne(id: number): Promise<User> {
    return await this.userRepository.findOneByOrFail({
      id: id
    });
  }

  async findBySocialIdAndProvider(socialId: string, provider: string): Promise<User> {
    return await this.userRepository.findOneByOrFail({
      socialId: socialId, provider: provider
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let user: User = await this.findOne(id);
    this.userMapper.updateDtoToEntity(updateUserDto, user);
    let updated: User = await this.userRepository.save(user);
    return updated;
  }

  async remove(id: number): Promise<void> {
    let user: User = await this.findOne(id);
    await this.userRepository.delete(user);
  }
}
