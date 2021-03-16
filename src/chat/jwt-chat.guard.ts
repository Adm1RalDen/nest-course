import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtChatGuard extends AuthGuard('websocketStrategyName') {
  getRequest(context) {
    console.log(context);
    return context.switchToWs().getClient().handshake;
  }
}
