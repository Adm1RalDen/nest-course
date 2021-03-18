import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { AuthService } from '../auth/auth.service';
import { Room, RoomDocument } from '../schemas/room.schema';
import { UsePipes } from '@nestjs/common';
import { ChatPipe } from './chat.pipe';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
    private authService: AuthService,
  ) {}

  // @UsePipes(ChatPipe)
  @SubscribeMessage('createNewContact')
  async createNewContact(client, data) {
    const token = client.handshake.auth.token;
    const user = await this.authService.checkToken(token);

    if (data.userId && data.nickname) {
      const newContact = {
        userId: data.userId,
        nickname: data.nickname,
      };

      const currentUser = await this.userModel.findById(user.userId);
      const userObject = currentUser.toObject();

      const checkedUserId = userObject.contacts.find(
        (contact) => contact.userId === data.userId,
      );

      if (checkedUserId) {
        client.emit('error-message', 'this userId is exists');
      } else {
        this.userModel.updateOne(
          { _id: user.userId },
          {
            $push: {
              contacts: newContact,
            },
          },
          {},
          this.done,
        );
        client.emit('gotNewContact', newContact);
      }
    } else {
      client.emit('error-message', 'userId or nickname not found');
    }
  }

  done(err, res): any {
    if (err) {
      console.log(err.message);
    } else {
      console.log('success');
    }
  }

  @SubscribeMessage('getContactList')
  async getContactList(client, message) {
    // console.log();
    // client.broadcast.emit('chat', message);
  }

  @SubscribeMessage('chat')
  async onChat(client, message) {
    client.broadcast.emit('chat', message);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('user is disconnect', client.id);
  }

  async handleConnection(@ConnectedSocket() client: Socket) {
    console.log('connected user', client.id);
    const token = client.handshake.auth.token;
    const fromToken = await this.authService.checkToken(token);

    const user = await this.userModel.findOne({ _id: fromToken.userId });
    const parsedUser = user.toObject();
    client.join(parsedUser.roomsIds.map((e) => e.toString()));

    this.roomModel.find(
      {
        _id: { $in: user.roomsIds },
      },
      (err, docks) => {
        if (!err) {
          client.emit('roomList', docks);
        }
      },
    );

    client.emit('catchUserData', user.toObject());
  }
}
