import { Module } from '@nestjs/common';
import { DatabaseModule } from './database.module';
import { MessageRepository } from '@repositories/message/message.repository';
import { AbstractMessageRepository } from '@repositories/message/abstract-message.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [],
    providers: [{ provide: AbstractMessageRepository, useClass: MessageRepository }],
    exports: [AbstractMessageRepository]
})
export class MessageModule { }
