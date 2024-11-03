import { NarrowedContext } from 'telegraf';
import { IServiceContext } from './IServiceContext';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

export type TOnFileUploadBotContext = NarrowedContext<
  IServiceContext,
  Update.MessageUpdate<Message.DocumentMessage>
>;
