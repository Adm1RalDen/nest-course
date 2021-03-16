import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../schemas/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({ email: loginDto.email });

    if (!user) {
      throw new BadRequestException('Пользователь не найден!');
    }

    const isMatchPass = await bcrypt.compare(loginDto.password, user.password);

    if (!isMatchPass) {
      throw new BadRequestException('Пароль не верный');
    }

    const token = await this.jwtService.sign({
      userId: user.id,
    });

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj['__v'];

    return {
      token,
      user: userObj,
    };
  }

  async register(registerDto: RegisterDto) {
    const candidate = await this.userModel.findOne({
      email: registerDto.email,
    });

    if (candidate) {
      throw new BadRequestException('Пользователь уже существует');
    }

    const password = await bcrypt.hash(registerDto.password, 12);

    const user = new this.userModel({
      ...registerDto,
      status: 'offline',
      password,
      roomsIds: [],
      lastActivity: Date.now(),
      contacts: [],
    });

    const token = await this.jwtService.sign({
      userId: user.id,
    });

    await user.save();

    const userObj = user.toObject();
    delete userObj.password;

    return {
      token: token,
      user: userObj,
    };
  }

  async checkToken(token: string) {
    return this.jwtService.verify(token, { publicKey: 'secret code' });
  }
}
