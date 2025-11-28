import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TopicDocument = Topic & Document;

@Schema({ timestamps: true })
export class Topic {
  // _id auto-generated

  @Prop({ required: true, trim: true, length: 255 })
  title: string;

  @Prop({ type: String, required: false })
  description?: string;

  @Prop({ type: [Types.ObjectId], ref: 'Message', default: [] })
  messages: Types.ObjectId[];

  createdAt?: Date;
  // updatedAt not in your TypeORM, but timestamps adds it (harmless)
}

export const TopicSchema = SchemaFactory.createForClass(Topic);