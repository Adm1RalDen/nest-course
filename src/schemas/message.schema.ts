import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ default: Date.now })
  timeSent: Date;

  @Prop()
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ type: Types.ObjectId, ref: 'Room' })
  chatRoomId: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
