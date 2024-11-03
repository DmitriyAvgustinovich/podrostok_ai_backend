import { Module } from '@nestjs/common';
import { BotModule } from './bot/bot.module';
import { OpenaiModule } from './openai/openai.module';
import { ControllersModule } from './controllers/controllers.module';

@Module({
  imports: [BotModule, OpenaiModule, ControllersModule],
  providers: [],
})
export class AppModule {}
