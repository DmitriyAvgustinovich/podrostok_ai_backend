import { BOT_CALLBACK_DATA, BOT_MESSAGES } from "../../../../constants/bot-constants";
import { getBotButtonByCallbackData } from "../get-bot-button-by-callback-data";
import { MENU_LABELS } from "../../../../constants/general-constants";

export const backToMenuHandler = async ({ ctx }) => {
  const messageText = BOT_MESSAGES.welcome;
  const replyMarkup = {
    inline_keyboard: [
      [getBotButtonByCallbackData(BOT_CALLBACK_DATA.botTellAboutProblems)],
      [
        {
          text: MENU_LABELS.takePsychoTest,
          web_app: { url: "https://jocular-khapse-ad54b5.netlify.app/" },
        },
      ],
      [
        getBotButtonByCallbackData(
          BOT_CALLBACK_DATA.botGetProfessionalPsychoHelp
        ),
      ],
    ],
  };

  const isWaitingForUserProblemAboutFlag =
    !ctx.session.isWaitingForUserProblemAbout && ctx.session.lastBotMessageId;

  try {
    if (isWaitingForUserProblemAboutFlag) {
      try {
        await ctx.telegram.editMessageText(
          ctx.chat.id,
          ctx.session.lastBotMessageId,
          undefined,
          messageText,
          {
            parse_mode: "Markdown",
            reply_markup: replyMarkup,
          }
        );
      } catch (error) {
        console.log(error);

        const sentMessage = await ctx.reply(messageText, {
          parse_mode: "Markdown",
          reply_markup: replyMarkup,
        });

        ctx.session.lastBotMessageId = sentMessage.message_id;
      }
    } else {
      const sentMessage = await ctx.reply(messageText, {
        parse_mode: "Markdown",
        reply_markup: replyMarkup,
      });

      ctx.session.lastBotMessageId = sentMessage.message_id;
    }

    ctx.session.messageMustBeDeleted = true;
  } catch (error) {
    console.log(error);
  }
};
