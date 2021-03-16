import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.yiowt.mongodb.net/nest?retryWrites=true&w=majority',
    ),
    ProductsModule,
    AuthModule,
    ChatModule,
  ],
})
export class AppModule {}