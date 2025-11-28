import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Message } from './entities/message.entity';
import { Topic } from '../topic/entities/topic.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message, Topic]), // Topic needed for relations
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}