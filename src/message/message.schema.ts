// src/message/schemas/message.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  // _id is auto-generated (same as @PrimaryGeneratedColumn())

  @Prop({ required: true, maxlength: 255, trim: true })
  author: string;

  @Prop({ required: true, type: String })
  content: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Topic' })
  topic: Types.ObjectId;

  // This matches your @CreateDateColumn({ type: 'timestamp' }) sentAt
  @Prop({ default: Date.now })
  sentAt: Date;

  // These come free from { timestamps: true }
  createdAt?: Date;
  updatedAt?: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);