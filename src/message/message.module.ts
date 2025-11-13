import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Topic } from '../topic/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Topic])],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}