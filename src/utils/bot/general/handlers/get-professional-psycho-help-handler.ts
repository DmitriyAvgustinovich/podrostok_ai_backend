import { BOT_CALLBACK_DATA, BOT_MESSAGES } from '../../../../constants/bot-constants';
import { getBotButtonByCallbackData } from '../get-bot-button-by-callback-data';

export const getProfessionalPsychoHelpHandler = async ({ ctx }) => {
  try {
    const messageText = BOT_MESSAGES.getProfessionalPsychoHelp;

    const replyMarkup = {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [getBotButtonByCallbackData(BOT_CALLBACK_DATA.botBackToMenu)],
        ],
      },
    };

    if (ctx.session.lastBotMessageId) {
      try {
        await ctx.telegram.editMessageText(
          ctx.chat.id,
          ctx.session.lastBotMessageId,
          undefined,
          messageText,
          replyMarkup,
        );
      } catch (error) {
        console.log(error);

        const sentMessage = await ctx.reply(messageText, replyMarkup);
        ctx.session.lastBotMessageId = sentMessage.message_id;
      }
    } else {
      const sentMessage = await ctx.reply(messageText, replyMarkup);
      ctx.session.lastBotMessageId = sentMessage.message_id;
    }

    ctx.session.messageMustBeDeleted = true;
  } catch (error) {
    console.log('Ошибка при отправке сообщения:', error);
  }
};
