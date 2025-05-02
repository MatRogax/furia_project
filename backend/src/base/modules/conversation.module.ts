
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@modules/database.module';
import { ConversationRepository } from '@repositories/conversation/conversation.repository';
import { AbstractConversationRepository } from '@repositories/conversation/abstract-conversation.repository';


@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [{ provide: AbstractConversationRepository, useClass: ConversationRepository }],
})
export class ConversationModule { }
