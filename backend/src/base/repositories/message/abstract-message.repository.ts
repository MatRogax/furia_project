import { CreateMessageDto } from "@dtos/create-messae.dto";
import { Message } from "@prisma/client";

export abstract class AbstractMessageRepository {
    abstract createMessage(messageDto: CreateMessageDto): Promise<Message>
    abstract findMessabyConversation(conversationId: string): Promise<Message>

}