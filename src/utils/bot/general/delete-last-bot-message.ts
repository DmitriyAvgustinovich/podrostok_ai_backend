import { IServiceContext } from '../../../types';

export const deleteLastBotMessage = async (ctx: IServiceContext) => {
  if (ctx.session.lastBotMessageId) {
    await ctx.deleteMessage(ctx.session.lastBotMessageId).catch(() => null);
  }
};

export const deleteLastBotMessageWithCondition = async (
  ctx: IServiceContext,
) => {
  if (ctx.session.lastBotMessageId && !ctx.session.messageMustBeDeleted) {
    await ctx.deleteMessage(ctx.session.lastBotMessageId).catch(() => null);
  }
};
