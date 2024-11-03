import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { BotController } from './bot.controller';
import { ConfigModule } from '@nestjs/config';
import { session, Telegraf } from 'telegraf';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
      middlewares: [session()],
    }),
  ],
  providers: [
    BotService,
    {
      provide: Telegraf,
      useFactory: () => new Telegraf(process.env.TELEGRAM_BOT_TOKEN),
    },
    BotController,
  ],
  exports: [BotService, Telegraf],
})
export class BotModule {}
