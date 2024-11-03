import { NarrowedContext } from 'telegraf';
import { IAdminContext } from './IAdminContext';
import { CallbackQuery, Update } from 'telegraf/typings/core/types/typegram';

export type TOnSelectTrendAdminContext = NarrowedContext<
  IAdminContext,
  Update.CallbackQueryUpdate<CallbackQuery.DataQuery>
>;
