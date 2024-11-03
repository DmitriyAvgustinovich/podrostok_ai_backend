import { Context } from 'telegraf';

export interface IServiceContext extends Context {
  session: {
    // general
    messageMustBeDeleted?: boolean;
    selectStack?: string;
    selectTrend?: string;
    selectedDirection?: string;
    lastBotMessageId?: number;
    waitingCVUser?: boolean;
    trendByCallbackButton: any;
    isWaitingForUserProblemAbout?: boolean;
    // general

    // elastic search
    elasticSearchQuery?: string;
    elasticSearchCurrentPage?: number;
    // elastic search

    // backend
    currentPageBackendSolutions?: number;
    backendSolutionsFiles: any;
    // backend

    // frontend
    currentPageFrontendSolutions?: number;
    frontendSolutionsFiles: any;
    // frontend
  };
}
