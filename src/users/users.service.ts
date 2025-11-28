// src/users/users.service.ts
import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existing = await this.userModel.findOne({ email: createUserDto.email }).exec();
    if (existing) throw new ConflictException('Email already in use');

    const hash = await bcrypt.hash(createUserDto.password, this.saltRounds);
    const user = new this.userModel({
      ...createUserDto,
      password: hash,
    });

    return await user.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User #${id} not found`);
    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, this.saltRounds);
    }

    const updated = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();

    if (!updated) throw new NotFoundException(`User #${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const result = await this.userModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`User #${id} not found`);
    return { deleted: true };
  }
}