import { BOT_CALLBACK_DATA, BOT_MESSAGES } from "../../../../constants/bot-constants";
import { getBotButtonByCallbackData } from "../get-bot-button-by-callback-data";

export const tellAboutProblemsMessageHandler = async ({ ctx }) => {
  const sentMessage = await ctx.reply(BOT_MESSAGES.tellAboutProblemsMessage, {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [getBotButtonByCallbackData(BOT_CALLBACK_DATA.botBackToMenu)],
      ],
    },
  });

  ctx.session.isWaitingForUserProblemAbout = true;
  ctx.session.lastBotMessageId = sentMessage.message_id;
  ctx.session.messageMustBeDeleted = false;
};
