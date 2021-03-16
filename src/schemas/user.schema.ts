import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Room } from './room.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true, unique: true })
  password: string;

  @Prop()
  name: string;

  @Prop()
  status: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Room' }] })
  roomsIds: Room;

  @Prop()
  lastActivity: Date;

  @Prop({
    type: [
      {
        userId: { type: Types.ObjectId, ref: 'User' },
        nickname: { type: String, required: true },
      },
    ],
  })
  contacts: [
    {
      userId: User;
      nickname: string;
    },
  ];
}

export const UserSchema = SchemaFactory.createForClass(User);
