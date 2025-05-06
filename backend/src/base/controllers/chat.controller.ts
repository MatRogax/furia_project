import { Body, Controller, Post } from "@nestjs/common";
import { ChatService } from "@services/chat.service";

@Controller('chat')
export class ChatController {
    constructor(private readonly chatService: ChatService) { }

    @Post('message')
    async sendMessage(@Body() body: { userId: string; message: string }) {
        const response = await this.chatService.responseHandlerMessage(body.message, body.userId);
        return response;
    }

}