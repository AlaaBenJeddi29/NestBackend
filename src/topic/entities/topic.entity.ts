import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { Message } from '../../message/entities/message.entity';

@Entity('topics')
export class Topic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  title: string;

  @Column({ nullable: true, type: 'text' })
  description?: string;

  // FIXED: Use @CreateDateColumn() instead of default()
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.topic, { cascade: true })
  messages: Message[];
}