import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { TEST_RESULT_PROMPT } from '../constants/prompt-gpt-constants';

@Injectable()
export class OpenaiService {
  private openai: OpenAI;
  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async sendMessageToChatGPT({ queryStr }): Promise<string> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: TEST_RESULT_PROMPT,
          },
          {
            role: 'user',
            content: `Сделай вывод на основе данных результатов психологического опроса, опираясь на данные тебе инструкции: ${queryStr}`,
          },
        ],
        max_tokens: 450,
      });

      return completion.choices[0]?.message?.content || 'Нет ответа от ChatGPT';
    } catch (error) {
      console.error('Ошибка при работе с ChatGPT:', error);
      return 'Произошла ошибка при работе с ChatGPT.';
    }
  }
}
