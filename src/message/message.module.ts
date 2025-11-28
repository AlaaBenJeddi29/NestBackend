// src/message/message.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message, MessageSchema } from './message.schema';
import { Topic, TopicSchema } from '../topic/topic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Topic.name, schema: TopicSchema }, // ← needed because MessageService injects Topic model
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}