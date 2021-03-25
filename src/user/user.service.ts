import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { userDto } from './dto/user.dto';
import { newContactDto } from './dto/newContact.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  updatedUserData(user: UserDocument) {
    const parsed = user.toObject();
    delete parsed.password;
    delete parsed['__v'];
    parsed.id = parsed._id;
    delete parsed._id;
    return parsed;
  }

  async getUserInfo(req: userDto) {
    const user = await this.userModel.findById(req.userId);
    if (user) {
      return this.updatedUserData(user);
    } else {
      throw new NotFoundException();
    }
  }

  async createNewContact(req: userDto, contact: newContactDto) {
    if (contact.nickname && contact.userId) {
      const newContact = {
        userId: contact.userId,
        nickname: contact.nickname,
      };

      const user = await this.getUserInfo(req);

      const checkedUserid = user.contacts.find((el) => {
        return el.userId.toString() === contact.userId;
      });

      if (checkedUserid) {
        throw new BadRequestException('user already exists');
      } else {
        this.userModel.updateOne(
          { _id: req.userId },
          {
            $push: {
              contacts: newContact,
            },
          },
          {},
          (err, res) => {
            console.log({ err, res });
          },
        );
        return this.getContactList(req);
      }
    } else {
      throw new BadRequestException();
    }
  }

  async getContactList(req: userDto) {
    const user = await this.getUserInfo(req);
    return user.contacts;
  }
}
