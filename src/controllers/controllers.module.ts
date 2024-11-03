import { Module } from '@nestjs/common';
import { ControllersService } from './controllers.service';
import { ControllersController } from './controllers.controller';
import { OpenaiModule } from '../openai/openai.module';

@Module({
  providers: [ControllersService],
  controllers: [ControllersController],
  exports: [ControllersService],
  imports: [OpenaiModule],
})
export class ControllersModule {}
