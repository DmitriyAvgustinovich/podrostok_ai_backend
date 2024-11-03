import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';

@Injectable()
export class ControllersService {
  constructor(private readonly openaiService: OpenaiService) {}

  async getPsychologicalTestResult({ body }): Promise<any> {
    return this.openaiService.sendMessageToChatGPT({ queryStr: body.str });
  }
}
