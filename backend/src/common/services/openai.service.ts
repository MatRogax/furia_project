import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';
@Injectable()
export class GeminiService {
    private genAI: GoogleGenerativeAI;

    constructor(private configService: ConfigService) {
        this.genAI = new GoogleGenerativeAI(
            this.configService.get<string>('GEMINI_API_KEY')
        );
    }

    async getResponse(messages: { role: 'user' | 'assistant' | 'system'; content: string }[]) {
        try {
            console.log(messages);
            console.log(this.genAI);

            const model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

            const prompt = messages.map(message => `${message.role}: ${message.content}`).join('\n');

            const result = await model.generateContent(prompt);
            return result.response.text() || 'Resposta não gerada.';
        } catch (error) {
            console.error('Erro Gemini:', error);
            throw new BadRequestException(
                'Falha ao gerar resposta com IA. Tente novamente mais tarde.'
            );
        }
    }
}   