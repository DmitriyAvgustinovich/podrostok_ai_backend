import { NarrowedContext } from 'telegraf';
import { IAdminContext } from './IAdminContext';
import { Message, Update } from 'telegraf/typings/core/types/typegram';

export type TOnFileUploadAdminContext = NarrowedContext<
  IAdminContext,
  Update.MessageUpdate<Message.DocumentMessage>
>;
