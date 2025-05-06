import { ResponseChatModel } from "@common/models/response-chat.model";
import { Role } from "@dtos/create-messae.dto";
import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { AbstractConversationRepository } from "@repositories/conversation/abstract-conversation.repository";
import { ConversationRepository } from "@repositories/conversation/conversation.repository";
import { AbstractMessageRepository } from "@repositories/message/abstract-message.repository";
import { OpenAiService } from "@services/openai.service";

@Injectable()
export class ChatService {
    constructor(
        private readonly messageRepository: AbstractMessageRepository,
        private readonly conversationRepository: AbstractConversationRepository,
        private readonly openAiService: OpenAiService,
    ) { }

    async responseHandlerMessage(userMessage: string, userId?: string) {
        try {
            const conversation = await this.conversationRepository.findOrCreateConversation(userId);
            const message = await this.messageRepository.createMessage({
                content: userMessage,
                role: Role.USER,
                userId: userId,
                conversationId: conversation.id
            })

            const conversationHistory = await this.messageRepository.getRecentMessages(message.conversationId);

            const responseMessage = await this.openAiService.getResponse(conversationHistory)

            const assistantMessage = await this.messageRepository.createMessage({
                content: responseMessage,
                role: Role.BOT,
                userId: userId,
                conversationId: conversation.id
            })

            const responseChat: ResponseChatModel = {
                idMessage: assistantMessage.id,
                message: userMessage,
                assistantMessage: responseMessage,
            }

            return responseChat;

        } catch (error) {
            throw new InternalServerErrorException(`Erro ao processar a resposta para pergunta (${userMessage}): ${error.message}`);
        }
    }
}