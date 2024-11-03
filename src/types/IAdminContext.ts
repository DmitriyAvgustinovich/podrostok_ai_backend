import { Context } from 'telegraf';

export interface IAdminContext extends Context {
  session: {
    // general
    waitingForAdminPassword?: boolean;
    isAdmin?: boolean;
    lastBotMessageId?: number;
    selectStack?: string;
    selectTrend?: string;
    selectedDirection?: string;
    selectedTrendId?: number;
    // general

    // file
    waitingForFileName?: boolean;
    waitingForFileDescription?: boolean;
    fileName?: string;
    fileDescription?: string;
    // file

    // direction
    directionName?: string;
    directionCallbackData?: string;
    waitingForDirectionName?: boolean;
    waitingForDirectionCallbackData?: boolean;
    // direction
  };
}
