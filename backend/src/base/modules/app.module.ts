
import { Module } from '@nestjs/common';
import { UserModule } from '@modules/user.module';
import configuration from '@config/config.enviroment';
import { ConfigModule } from '@nestjs/config';
import { ChatModule } from './chat.module';
import { MessageModule } from './message.module';
import { ConversationModule } from './conversation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    ChatModule,
    MessageModule,
    ConversationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
