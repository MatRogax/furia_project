import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OpenAI } from 'openai';

@Injectable()
export class OpenAiService {
    private openai: OpenAI;

    constructor(private configService: ConfigService) {
        const configuration = {
            apiKey: this.configService.get<string>('OPENAI_API_KEY'),
        };
        this.openai = new OpenAI(configuration);
    }
    async getResponse(messages: any[]): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                store: true,
                messages,
            });
            return response.choices[0].message.content;
        } catch (error) {
            console.error('Erro ao consultar OpenAI:', error);
            throw new Error('Erro ao gerar resposta com IA. Tente novamente mais tarde.');
        }
    }

}