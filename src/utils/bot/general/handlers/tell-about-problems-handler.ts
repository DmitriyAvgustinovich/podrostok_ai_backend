import { BOT_CALLBACK_DATA } from '../../../../constants/bot-constants';
import { getBotButtonByCallbackData } from '../get-bot-button-by-callback-data';
import {
  PROMPT_ABOUT_USER_PROBLEM_GPT,
  SYSTEM_ROLE_PROBLEM_PROMPT,
} from '../../../../constants/prompt-gpt-constants';

export const taskThemeFromCourseHandler = async ({
  ctx,
  userProblemMessage,
}) => {
  try {
    const { default: fetch } = await import('node-fetch');

    if (!ctx.session.userProblemDialogue) {
      ctx.session.userProblemDialogue = [
        {
          role: 'system',
          content: SYSTEM_ROLE_PROBLEM_PROMPT,
        },
      ];
    }

    ctx.session.userProblemDialogue.push({
      role: 'user',
      content: PROMPT_ABOUT_USER_PROBLEM_GPT(userProblemMessage),
    });

    const gptResponse = await fetch(
      'https://api.openai.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: ctx.session.userProblemDialogue,
          max_tokens: 550,
          temperature: 0.7,
        }),
      },
    );

    const result = await gptResponse.json();
    const gptMessage = result.choices[0].message.content;

    ctx.session.userProblemDialogue.push({
      role: 'assistant',
      content: gptMessage,
    });

    const problemReviewMessage = await ctx.reply(gptMessage, {
      parse_mode: 'Markdown',
      reply_markup: {
        inline_keyboard: [
          [getBotButtonByCallbackData(BOT_CALLBACK_DATA.botBackToMenu)],
        ],
      },
    });

    ctx.session.lastBotMessageId = problemReviewMessage.message_id;
    ctx.session.messageMustBeDeleted = true;
  } catch (error) {
    console.log(error);
    await ctx.reply('Произошла ошибка при обработке запроса.');
  }
};
