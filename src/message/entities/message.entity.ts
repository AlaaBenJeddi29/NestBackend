import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Topic } from '../../topic/entities/topic.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  author: string;

  @Column({ type: 'text' })
  content: string;

  // GOOD: @CreateDateColumn() is correct
  @CreateDateColumn({ type: 'timestamp' })
  sentAt: Date;

  @ManyToOne(() => Topic, (topic) => topic.messages, { onDelete: 'CASCADE' })
  topic: Topic;
}