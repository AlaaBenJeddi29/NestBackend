// src/message/message.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';
import { Topic, TopicDocument } from '../topic/topic.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    @InjectModel(Topic.name) private topicModel: Model<TopicDocument>,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const topic = await this.topicModel.findById(createMessageDto.topicId).exec();
    if (!topic) throw new NotFoundException(`Topic ${createMessageDto.topicId} not found`);

    const message = new this.messageModel({
      author: createMessageDto.author,
      content: createMessageDto.content,
      topic: topic._id,
    });

    const savedMessage = await message.save();

    // Add message to topic's messages array
    await this.topicModel.findByIdAndUpdate(
      topic._id,
      { $push: { messages: savedMessage._id } },
      { new: true },
    );

    return savedMessage;
  }

  findAll() {
    return this.messageModel.find().populate('topic').exec();
  }

  async findOne(id: string) {
    const message = await this.messageModel.findById(id).populate('topic').exec();
    if (!message) throw new NotFoundException(`Message #${id} not found`);
    return message;
  }

  async update(id: string, updateMessageDto: UpdateMessageDto) {
    const updated = await this.messageModel
      .findByIdAndUpdate(id, updateMessageDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Message #${id} not found`);
    return updated;
  }

  async remove(id: string) {
    const message = await this.messageModel.findById(id).exec();
    if (!message) throw new NotFoundException(`Message #${id} not found`);

    // Remove from topic's messages array
    await this.topicModel.findByIdAndUpdate(
      message.topic,
      { $pull: { messages: message._id } },
    );

    await message.deleteOne();
    return { deleted: true };
  }
}