import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtChatStrategy extends PassportStrategy(
  Strategy,
  'websocketStrategyName',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('jwtTokenFieldName'),
      ignoreExpiration: false,
      secretOrKey: 'secret code',
    });
  }

  async validate(payload: any) {
    console.log('jwt-chat-validate', payload);
    return { userId: payload.userId };
  }
}
