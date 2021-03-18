import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ChatPipe implements PipeTransform {
  constructor(private readonly authService: AuthService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    // const { error } = this.schema.validate(value);
    // console.log('socket value', value);
    // console.log('socket metadata', metadata);
    console.log(metadata);
    console.log('log', typeof value, value.handshake?.auth?.token);
    // const token = value.handshake?.auth?.token;
    // const user = await this.authService.checkToken(token);
    return value;
  }
}
