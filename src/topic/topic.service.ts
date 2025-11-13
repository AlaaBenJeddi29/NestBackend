import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';

@Injectable()
export class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
  ) {}

  async create(createTopicDto: CreateTopicDto) {
    console.log('Creating topic with:', createTopicDto); // DEBUG

    const topic = this.topicRepository.create(createTopicDto);
    const saved = await this.topicRepository.save(topic);

    console.log('Saved topic:', saved); // DEBUG

    return saved;
  }

  findAll() {
    return this.topicRepository.find({ relations: ['messages'] });
  }

  findOne(id: number) {
    return this.topicRepository.findOne({
      where: { id },
      relations: ['messages'],
    });
  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    const topic = await this.topicRepository.findOneBy({ id });
    if (!topic) throw new Error('Topic not found');
    Object.assign(topic, updateTopicDto);
    return this.topicRepository.save(topic);
  }

  async remove(id: number) {
    const topic = await this.topicRepository.findOneBy({ id });
    if (!topic) throw new Error('Topic not found');
    await this.topicRepository.remove(topic);
    return { deleted: true };
  }
}