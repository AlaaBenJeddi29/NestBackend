import { IsString, IsInt } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  author: string;

  @IsString()
  content: string;

  @IsInt()
  topicId: number;
}