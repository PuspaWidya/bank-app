import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import sequelize from 'sequelize';
import { successConstant } from 'src/common/errorCode';
import { FilterException } from 'src/common/filterException';
import { User } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Op } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepository: typeof User,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const checkUser = await this.userRepository.findOne({
        where: {
          [Op.or]: [
            {
              email: createUserDto.email,
            },
            { username: createUserDto.username },
          ],
        },
      });

      if (checkUser) {
        throw new ForbiddenException({ message: 'user already exist' });
      }

      await this.userRepository.create(createUserDto);

      return successConstant;
    } catch (err) {
      throw new FilterException(err);
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
