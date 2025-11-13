import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { Message } from './entities/message.entity';
import { Topic } from '../topic/entities/topic.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepo: Repository<Message>,
    @InjectRepository(Topic)
    private topicRepo: Repository<Topic>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    console.log('Creating message:', createMessageDto); // DEBUG

    const topic = await this.topicRepo.findOne({
      where: { id: createMessageDto.topicId },
    });
    if (!topic) throw new NotFoundException(`Topic ${createMessageDto.topicId} not found`);

    const message = this.messageRepo.create({
      ...createMessageDto,
      topic,
    });

    const saved = await this.messageRepo.save(message);
    console.log('Saved message:', saved); // DEBUG

    return saved;
  }

  findAll() {
    return this.messageRepo.find({ relations: ['topic'] });
  }

  findOne(id: number) {
    return this.messageRepo.findOne({ where: { id }, relations: ['topic'] });
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.messageRepo.findOneBy({ id });
    if (!message) throw new NotFoundException();

    if (updateMessageDto.topicId) {
      const topic = await this.topicRepo.findOneBy({ id: updateMessageDto.topicId });
      if (!topic) throw new NotFoundException('Topic not found');
      message.topic = topic;
    }

    Object.assign(message, updateMessageDto);
    return this.messageRepo.save(message);
  }

  async remove(id: number) {
    const message = await this.messageRepo.findOneBy({ id });
    if (!message) throw new NotFoundException();
    await this.messageRepo.remove(message);
    return { deleted: true };
  }
}