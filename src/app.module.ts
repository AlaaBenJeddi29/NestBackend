// src/app.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TopicModule } from './topic/topic.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestdb'),
    UsersModule,
    TopicModule,
    MessageModule,
  ],
})
export class AppModule {}