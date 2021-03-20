import { Module } from '@nestjs/common';
import { ChatGateway } from './chat.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtChatStrategy } from './jwt-chat.strategy';
import { Room, RoomSchema } from '../schemas/room.schema';
import { Message, MessageSchema } from '../schemas/message.schema';

@Module({
  providers: [ChatGateway, AuthService, JwtChatStrategy],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Room.name,
        schema: RoomSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
    JwtModule.register({
      secret: 'secret code',
      signOptions: { expiresIn: '12h' },
    }),
  ],
})
export class ChatModule {}
