import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })  // automatically adds createdAt & updatedAt
export class User {
  // id is automatically added by MongoDB as _id (ObjectId)

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, trim: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // createdAt & updatedAt come from { timestamps: true }
  createdAt?: Date;
  updatedAt?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);