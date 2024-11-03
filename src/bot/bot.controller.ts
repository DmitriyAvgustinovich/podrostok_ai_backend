import { Injectable } from '@nestjs/common';
import {
  Action,
  Ctx,
  Next,
  On,
  Start,
  Update as TelegrafUpdate,
} from 'nestjs-telegraf';
import { BotService } from './bot.service';
import { Message } from 'telegraf/typings/core/types/typegram';
import {
  getBotButtonByCallbackData,
  taskThemeFromCourseHandler,
} from '../utils';
import { IServiceContext } from '../types';
import { BOT_CALLBACK_DATA, BOT_MESSAGES } from '../constants/bot-constants';

@TelegrafUpdate()
@Injectable()
export class BotController {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: IServiceContext) {
    await this.botService.handleStartBot(ctx);
  }

  // ========================================= BACKEND ACTIONS =========================================
  @On('text')
  async onTaskThemeFromCourseText(
    @Ctx() ctx: IServiceContext,
    @Next() next: () => Promise<void>,
  ) {
    const message = ctx.message as Message.TextMessage;

    if (ctx.session.isWaitingForUserProblemAbout) {
      await taskThemeFromCourseHandler({
        ctx,
        userProblemMessage: message.text,
      });
    }

    return next();
  }

  // ========================================= GENERAL ACTIONS =========================================
  @Action(BOT_CALLBACK_DATA.botBackToMenu)
  async onBackToMenu(@Ctx() ctx: IServiceContext) {
    await this.botService.handleBackToMenu(ctx);
  }

  @Action(BOT_CALLBACK_DATA.botGetProfessionalPsychoHelp)
  async onGetProfessionalPsychoHelp(@Ctx() ctx: IServiceContext) {
    await this.botService.handleGetProfessionalPsychoHelp(ctx);
  }
  // ========================================= GENERAL ACTIONS =========================================

  // ========================================= OPENAI ACTIONS =========================================
  @Action(BOT_CALLBACK_DATA.botTellAboutProblems)
  async onTaskFromCourse(@Ctx() ctx: IServiceContext) {
    const sentMessage = await ctx.reply(BOT_MESSAGES.tellAboutProblemsMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [getBotButtonByCallbackData(BOT_CALLBACK_DATA.botBackToMenu)],
        ],
      },
    });

    ctx.session.isWaitingForUserProblemAbout = true;
    ctx.session.lastBotMessageId = sentMessage.message_id;
    ctx.session.messageMustBeDeleted = false;
  }

  // ========================================= OPENAI ACTIONS =========================================
}
