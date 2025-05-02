import { Conversation } from "@prisma/client";

export abstract class AbstractConversationRepository {
    abstract findOrCreateConversation(userId: string): Promise<Conversation>
    abstract updateConversation(conversationId: string, updateData: { status: 'PENDING' | 'COMPLETED' | 'ARCHIVED' }): Promise<Conversation>
    abstract DeleteConversation(conversationId: string): Promise<Conversation>

}