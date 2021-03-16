import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class ChatPipe implements PipeTransform {
  constructor(private readonly authService: AuthService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    // const { error } = this.schema.validate(value);
    // console.log('socket value', value);
    // console.log('socket metadata', metadata);
    console.log(metadata);
    console.log('log', typeof value, value.handshake?.auth?.token);
    // console.log(this.authService.checkToken(value.handshake.auth.token));
    return value;
  }
}
