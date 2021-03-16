import { Body, Controller, HttpCode, Post, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JoiValidationPipe } from '../pipes/joi-validation.pipe';
import {
  JoiLoginSchema,
  JoiRegisterSchema,
} from '../joi-schemas/joi-auth.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @HttpCode(200)
  @UsePipes(new JoiValidationPipe(JoiLoginSchema))
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/register')
  @UsePipes(new JoiValidationPipe(JoiRegisterSchema))
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
