import { PrismaService } from "@database/prisma.service";
import { AbstractConversationRepository } from "@repositories/conversation/abstract-conversation.repository";
import { Conversation } from "@prisma/client";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

export class ConversationRepository implements AbstractConversationRepository {
    constructor(private readonly prismaService: PrismaService) { }
    async findOrCreateConversation(userId: string): Promise<Conversation> {
        try {
            const conversation = await this.prismaService.conversation.findFirst({
                where: {
                    userId: userId,
                    status: "PENDING"
                }
            })

            if (!conversation) {
                return await this.prismaService.conversation.create({
                    data: {
                        userId: userId,
                        status: "PENDING"
                    }
                })
            }

            return conversation;
        } catch (error) {
            throw new InternalServerErrorException("erro ao encontrar/criar a conversa " + error.message);
        }
    }
    async updateConversation(conversationId: string, updateData: { status: "PENDING" | "COMPLETED" | "ARCHIVED"; }): Promise<Conversation> {
        try {
            const conversation = await this.prismaService.conversation.update({
                where: {
                    id: conversationId
                },
                data: updateData
            })
            return conversation;
        } catch (error) {
            throw new BadRequestException("erro ao atualizar a conversa " + error.message);
        }
    }
    async DeleteConversation(conversationId: string): Promise<Conversation> {
        try {
            const conversation = await this.prismaService.conversation.delete({
                where: {
                    id: conversationId
                }
            })
            return conversation;
        } catch (error) {
            throw new BadRequestException("erro ao deletar a conversa " + error.message);
        }
    }
}