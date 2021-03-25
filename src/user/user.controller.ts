import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { newContactDto } from './dto/newContact.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/get-data')
  getUserInfo(@Request() req) {
    return this.userService.getUserInfo(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-contact-list')
  getContactList(@Request() req) {
    return this.userService.getContactList(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create-new-contact')
  createNewContact(@Request() req, @Body() newContactDto: newContactDto) {
    console.log({ user: req.user, newContactDto });
    return this.userService.createNewContact(req.user, newContactDto);
  }
}
