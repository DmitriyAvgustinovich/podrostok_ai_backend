import { MENU_LABELS } from '../../../../constants/general-constants';
import {
  BOT_CALLBACK_DATA,
  BOT_MESSAGES,
} from '../../../../constants/bot-constants';
import { deleteLastBotMessage } from '../delete-last-bot-message';
import { getBotButtonByCallbackData } from '../get-bot-button-by-callback-data';

export const startBotHandler = async ({ ctx }) => {
  deleteLastBotMessage(ctx);

  const menuCommands = [{ command: 'start', description: 'Запуск бота' }];
  await ctx.telegram.setMyCommands(menuCommands);

  const sentMessage = await ctx.reply(BOT_MESSAGES.welcome, {
    parse_mode: 'Markdown',
    reply_markup: {
      inline_keyboard: [
        [getBotButtonByCallbackData(BOT_CALLBACK_DATA.botTellAboutProblems)],
        [
          {
            text: MENU_LABELS.takePsychoTest,
            web_app: { url: 'https://jocular-khapse-ad54b5.netlify.app/' },
          },
        ],
        [
          getBotButtonByCallbackData(
            BOT_CALLBACK_DATA.botGetProfessionalPsychoHelp,
          ),
        ],
      ],
    },
  });

  ctx.session.messageMustBeDeleted = true;
  ctx.session.lastBotMessageId = sentMessage.message_id;
};
