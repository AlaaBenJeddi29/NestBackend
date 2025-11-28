import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TopicModule } from './topic/topic.module';
import { MessageModule } from './message/message.module';

// Import your TypeORM entities
import { User } from './users/entities/user.entity';
import { Topic } from './topic/entities/topic.entity';
import { Message } from './message/entities/message.entity';

@Module({
  imports: [
    // TypeORM connection (SQLite for zero-config dev, or PostgreSQL)
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',           // fastest for dev, or use 'postgres'
      database: 'nestdb.sqlite',        // creates a file in your project
      entities: [User, Topic, Message], // all your entities
      synchronize: true,                // auto-create tables (dev only!)
      logging: true,
    }),

    // If you prefer PostgreSQL later, just switch to:
    // type: 'postgres',
    // host: 'localhost',
    // port: 5432,
    // username: 'postgres',
    // password: 'yourpass',
    // database: 'nestdb',

    UsersModule,
    TopicModule,
    MessageModule,
  ],
})
export class AppModule {}