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
import { UseGuards, UsePipes } from '@nestjs/common';
import { WsGuard } from './ws.guard';
import { ChatPipe } from './chat.pipe';
import { JwtChatGuard } from './jwt-chat.guard';
import { AuthService } from '../auth/auth.service';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server;

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private authService: AuthService,
  ) {}

  // @UseGuards(JwtChatGuard)
  async handleConnection(@ConnectedSocket() client: Socket) {
    client.join(client.handshake.auth.token);
    const checked = await this.authService.checkToken('dsfasd');
    console.log('user is connected this', client.id);
    this.server.emit('users', {
      currentUser: client.id,
      token: client.handshake.auth.token,
    });
  }

  sendMessage(data: any) {
    this.server.emit('data-from-serv', data);
  }

  async handleDisconnect(@ConnectedSocket() client: Socket) {
    console.log('user is disconnect', client.id);
    // A client has disconnected

    // Notify connected clients of current users
    this.server.emit('users');
  }

  // @UseGuards(WsGuard)
  @UsePipes(ChatPipe)
  @SubscribeMessage('createNewContact')
  async createNewContact(client, data) {
    // console.log('create new contact', data, client.handshake.auth.token);
    if (data.userId && data.nickname) {
      const newContact = {
        userId: data.userId,
        nickname: data.nickname,
      };

      // this.userModel.updateOne(
      //   { _id: client.userId },
      //   {
      //     $push: {
      //       contacts: newContact,
      //     },
      //   },
      //   {},
      //   this.done,
      // );
      client.emit('gotNewContact', newContact);
    } else {
      client.emit('error-message', 'userId or nickname not found');
    }
  }
  done(err, res): any {
    if (err) {
      console.log(err.message);
    } else {
      console.log(res);
    }
  }

  @UsePipes(ChatPipe)
  @SubscribeMessage('getContactList')
  async getContactList(client, message) {
    // console.log();
    // client.broadcast.emit('chat', message);
  }
  @SubscribeMessage('chat')
  async onChat(client, message) {
    client.broadcast.emit('chat', message);
  }
}
