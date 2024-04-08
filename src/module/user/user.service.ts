import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = await this.isUserExists(createUserDto.email);
    if (user) {
      throw new BadRequestException(
        'User already exist. Please change your email.',
      );
    }

    const hashedPassword = await this.hashingPassword(createUserDto.password);
    const newUser: CreateUserDto = this.userRepository.create({
      username: createUserDto.username,
      email: createUserDto.email,
      password: hashedPassword,
    });
    return await this.userRepository.save(newUser);
  }

  async findUser(id: number) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new BadRequestException('User is not found. Please try again.');
    }
    return user;
  }

  async removeUser(id: number) {
    const user = await this.findUserById(id);
    if (!user) {
      throw new BadRequestException('Such user does not exist.');
    }
    return await this.userRepository.remove(user);
  }

  private async findUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  private async isUserExists(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  private async hashingPassword(password: string) {
    return await bcrypt.hash(password, 7);
  }
}
