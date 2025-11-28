// src/topic/topic.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Topic, TopicDocument } from './topic.schema';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Injectable()
export class TopicService {
  constructor(
    @InjectModel(Topic.name) private topicModel: Model<TopicDocument>,
  ) {}

  async create(createTopicDto: CreateTopicDto) {
    const topic = new this.topicModel(createTopicDto);
    return await topic.save();
  }

  findAll() {
    return this.topicModel.find().populate('messages').exec();
  }

  async findOne(id: string) {
    const topic = await this.topicModel.findById(id).populate('messages').exec();
    if (!topic) throw new NotFoundException(`Topic #${id} not found`);
    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    const updated = await this.topicModel
      .findByIdAndUpdate(id, updateTopicDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Topic #${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const result = await this.topicModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException(`Topic #${id} not found`);
    return { deleted: true };
  }
}