import { Injectable } from "@nestjs/common";
import {
  backToMenuHandler,
  startBotHandler,
  tellAboutProblemsMessageHandler,
} from "../utils";
import { IServiceContext } from "../types";
import { getProfessionalPsychoHelpHandler } from "../utils/bot/general/handlers/get-professional-psycho-help-handler";

@Injectable()
export class BotService {
  // ========================================= GENERAL HANDLERS =========================================
  async handleStartBot(ctx: IServiceContext) {
    startBotHandler({ ctx });
  }
  // ========================================= GENERAL HANDLERS =========================================
  async handleBackToMenu(ctx: IServiceContext) {
    backToMenuHandler({ ctx });
  }

  async handleGetProfessionalPsychoHelp(ctx: IServiceContext) {
    getProfessionalPsychoHelpHandler({ ctx });
  }

  async handleTellAboutProblemsMessage(ctx: IServiceContext) {
    tellAboutProblemsMessageHandler({ ctx });
  }
  // ========================================= OPENAI HANDLERS =========================================
  // ========================================= OPENAI HANDLERS =========================================
}
