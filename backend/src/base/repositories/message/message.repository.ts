import { PrismaService } from "@database/prisma.service";
import { CreateMessageDto } from "@dtos/create-messae.dto";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Message } from "@prisma/client";
import { AbstractMessageRepository } from "@repositories/message/abstract-message.repository";

@Injectable()
export class MessageRepository implements AbstractMessageRepository {
    constructor(private readonly prismaService: PrismaService) { }
    async createMessage(MessageDto: CreateMessageDto): Promise<Message> {
        try {
            const sendMessage = await this.prismaService.message.create({
                data: {
                    ...MessageDto
                }
            });

            return sendMessage;
        } catch (error) {
            throw new BadRequestException('erro ao criar a mensagem de envio ' + error.message);
        }
    }

    async getRecentMessages(
        conversationId: string,
        limit = 10
      ): Promise<{ role: 'user' | 'assistant'; content: string }[]> {
        const messages = await this.prismaService.message.findMany({
          where: { conversationId },
          orderBy: { createdAt: 'asc' },
          take: limit,
          select: {
            content: true,
            role: true,
          },
        });
    
        return messages.map(msg => ({
          role: msg.role === 'USER' ? 'user' : 'assistant',
          content: msg.content,
        }));
      }

    async findMessabyConversation(conversationId: string): Promise<Message> {
        try {
            const findMessage = await this.prismaService.message.findFirst({
                where: {
                    conversationId
                }
            })
            return findMessage;
        } catch (error) {
            throw new NotFoundException('erro ao encontrar a mensagem de envio ' + error.message);
        }
    }

}