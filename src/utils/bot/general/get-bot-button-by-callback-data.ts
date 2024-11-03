import {
  BOT_CALLBACK_DATA,
  BOT_MESSAGES,
} from '../../../constants/bot-constants';
import { MENU_LABELS } from '../../../constants/general-constants';

export const getBotButtonByCallbackData = (callbackData: string) => {
  switch (callbackData) {
    case BOT_CALLBACK_DATA.botTellAboutProblems:
      return {
        text: MENU_LABELS.tellAboutProblems,
        callback_data: BOT_CALLBACK_DATA.botTellAboutProblems,
      };
    case BOT_CALLBACK_DATA.botTakePsychoTest:
      return {
        text: MENU_LABELS.takePsychoTest,
        callback_data: BOT_CALLBACK_DATA.botTakePsychoTest,
      };
    case BOT_CALLBACK_DATA.botGetProfessionalPsychoHelp:
      return {
        text: MENU_LABELS.getProfessionalPsychoHelp,
        callback_data: BOT_CALLBACK_DATA.botGetProfessionalPsychoHelp,
      };
    case BOT_CALLBACK_DATA.botBackToMenu:
      return {
        text: BOT_MESSAGES.backToMenu,
        callback_data: BOT_CALLBACK_DATA.botBackToMenu,
      };
  }
};
