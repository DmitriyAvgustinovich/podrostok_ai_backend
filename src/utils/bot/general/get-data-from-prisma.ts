import { TRecordStringNumberObject } from '../../../types';

export const getDataFromPrisma = async ({
  prismaContext,
  callbackQueryData,
  ctxSession,
  prismaDataPrefix,
  prismaDataId,
}: {
  prismaContext?: any;
  callbackQueryData?: string;
  ctxSession?: any;
  prismaDataPrefix?: string;
  prismaDataId?: string | number;
}) => {
  // ========================================= STACKS =========================================
  const stacksList = await prismaContext?.[prismaDataPrefix].findMany();

  const stacksButtonsList = stacksList.map(
    (stack: TRecordStringNumberObject) => {
      return [{ text: stack.name, callback_data: stack.callback_button }];
    },
  );

  const stackByCallbackButton = await prismaContext?.[
    prismaDataPrefix
  ].findFirst({
    where: {
      callback_button: callbackQueryData,
    },
  });

  const whereStackId = prismaDataId
    ? { id: prismaDataId }
    : { callback_button: ctxSession?.selectStack };

  const stackById = await prismaContext?.[prismaDataPrefix].findFirst({
    where: whereStackId,
  });
  // ========================================= STACKS =========================================

  // ========================================= TRENDS =========================================
  const trendsList = await prismaContext?.[prismaDataPrefix].findMany();

  const trendsButtonsList = trendsList.map(
    (trend: TRecordStringNumberObject) => {
      return [
        {
          text: trend.name,
          callback_data: trend.callback_button,
        },
      ];
    },
  );

  const trendByCallbackButton = await prismaContext?.[
    prismaDataPrefix
  ].findFirst({
    where: { callback_button: callbackQueryData },
  });

  const whereTrendId = prismaDataId
    ? { id: prismaDataId }
    : { callback_button: ctxSession?.selectTrend };

  const trendById = await prismaContext?.[prismaDataPrefix].findFirst({
    where: whereTrendId,
  });
  // ========================================= TRENDS =========================================

  // ========================================= TREND_FILES =========================================
  const backendTrendFiles = await prismaContext.trendFile.findMany({
    where: {
      backendStack: {
        callback_button: ctxSession?.selectStack,
      },
      backendTrend: {
        callback_button: callbackQueryData,
      },
    },
    include: {
      backendStack: true,
      backendTrend: true,
    },
  });

  const frontendTrendFiles = await prismaContext.trendFile.findMany({
    where: {
      frontendStack: {
        callback_button: ctxSession?.selectStack,
      },
      frontendTrend: {
        callback_button: callbackQueryData,
      },
    },
    include: {
      frontendStack: true,
      frontendTrend: true,
    },
  });
  // ========================================= TREND_FILES =========================================

  return {
    //  stacks
    stacksButtonsList,
    stackByCallbackButton,
    stackById,
    //  stacks

    //  trends
    trendsButtonsList,
    trendByCallbackButton,
    trendById,
    //  trends

    //  trend files
    backendTrendFiles,
    frontendTrendFiles,
    //  trend files
  };
};
