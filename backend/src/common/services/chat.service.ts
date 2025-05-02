import { ResponseChatModel } from "@common/models/response-chat.model";
import { Role } from "@dtos/create-messae.dto";
import { InternalServerErrorException } from "@nestjs/common";
import { ConversationRepository } from "@repositories/conversation/conversation.repository";
import { MessageRepository } from "@repositories/message/message.repository";
import { OpenAiService } from "@services/openai.service";
import { InternalServerError } from "openai";

export class ChatService {
    constructor(
        private readonly messageRepository: MessageRepository,
        private readonly conversationRepository: ConversationRepository,
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
            throw new InternalServerErrorException(`Erro ao processar a resposta para pergunta ${userMessage}: ${error.message}`);
        }
    }
}