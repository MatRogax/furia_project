import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ChatController } from '@controllers/chat.controller';

@Module({
    imports: [DatabaseModule],
    controllers: [ChatController],
    // providers: [{ provide: , useClass: }],
})
export class MessageModule { }
