import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { ChatController } from '@controllers/chat.controller';
import { MessageModule } from './message.module';
import { ConversationModule } from './conversation.module';
import { ChatService } from '@services/chat.service';
import { GeminiService } from '@services/openai.service';

@Module({
    imports: [DatabaseModule, MessageModule, ConversationModule],
    controllers: [ChatController],
    providers: [ChatService, GeminiService],

})
export class ChatModule { }
