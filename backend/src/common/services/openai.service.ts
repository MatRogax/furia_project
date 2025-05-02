import { ConfigService } from '@nestjs/config/dist/config.service';
import { OpenAI } from 'openai';

export class OpenAiService {
    private openai: OpenAI;

    constructor(private configService: ConfigService) {
        const configuration = {
            apiKey: this.configService.get<string>('OPENAI_API_KEY'),
        };
        this.openai = new OpenAI(configuration);
    }
    async getResponse(messages: any[]): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
        });
        return response.choices[0].message.content;
    }
}