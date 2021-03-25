import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client', 'out'),
    }),
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.yiowt.mongodb.net/nest?retryWrites=true&w=majority',
    ),
    ProductsModule,
    AuthModule,
    ChatModule,
    UserModule,
  ],
})
export class AppModule {}
