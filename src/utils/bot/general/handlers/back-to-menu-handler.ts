import { BOT_CALLBACK_DATA, BOT_MESSAGES } from 'src/constants/bot-constants';
import { getBotButtonByCallbackData } from '../get-bot-button-by-callback-data';

// export const backToMenuHandler = async ({ ctx }) => {
//   const sentMessage = await ctx.reply(BOT_MESSAGES.welcome, {
//     parse_mode: 'Markdown',
//     reply_markup: {
//       inline_keyboard: [
//         [getBotButtonByCallbackData(BOT_CALLBACK_DATA.botTellAboutProblems)],
//         [getBotButtonByCallbackData(BOT_CALLBACK_DATA.botTakePsychoTest)],
//         [
//           getBotButtonByCallbackData(
//             BOT_CALLBACK_DATA.botGetProfessionalPsychoHelp,
//           ),
//         ],
//       ],
//     },
//   });

//   ctx.session.messageMustBeDeleted = true;
//   ctx.session.lastBotMessageId = sentMessage.message_id;
// };

export const backToMenuHandler = async ({ ctx }) => {
  const messageText = BOT_MESSAGES.welcome;
  const replyMarkup = {
    inline_keyboard: [
      [getBotButtonByCallbackData(BOT_CALLBACK_DATA.botTellAboutProblems)],
      [getBotButtonByCallbackData(BOT_CALLBACK_DATA.botTakePsychoTest)],
      [
        getBotButtonByCallbackData(
          BOT_CALLBACK_DATA.botGetProfessionalPsychoHelp,
        ),
      ],
    ],
  };

  try {
    // Проверка, если флаг isWaitingForUserProblemAbout отсутствует
    if (
      !ctx.session.isWaitingForUserProblemAbout &&
      ctx.session.lastBotMessageId
    ) {
      try {
        // Пытаемся отредактировать сообщение
        await ctx.telegram.editMessageText(
          ctx.chat.id,
          ctx.session.lastBotMessageId,
          undefined,
          messageText,
          {
            parse_mode: 'Markdown',
            reply_markup: replyMarkup,
          },
        );
      } catch (editError) {
        console.log(
          'Не удалось отредактировать сообщение, отправляем новое:',
          editError,
        );

        // Если редактирование не удалось, отправляем новое сообщение
        const sentMessage = await ctx.reply(messageText, {
          parse_mode: 'Markdown',
          reply_markup: replyMarkup,
        });

        // Обновляем идентификатор последнего сообщения
        ctx.session.lastBotMessageId = sentMessage.message_id;
      }
    } else {
      // Если флаг isWaitingForUserProblemAbout установлен, отправляем новое сообщение
      const sentMessage = await ctx.reply(messageText, {
        parse_mode: 'Markdown',
        reply_markup: replyMarkup,
      });

      // Обновляем идентификатор последнего сообщения
      ctx.session.lastBotMessageId = sentMessage.message_id;
    }

    ctx.session.messageMustBeDeleted = true;
  } catch (error) {
    console.log('Ошибка при обработке меню:', error);
  }
};
