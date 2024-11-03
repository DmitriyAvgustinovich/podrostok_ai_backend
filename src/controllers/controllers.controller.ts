import { Controller, Post, Body } from '@nestjs/common';
import { ControllersService } from './controllers.service';
import { GetPsychologicalTestResultDto } from './dto/dto.dto';

@Controller('api/controllers')
export class ControllersController {
  constructor(private readonly controllersService: ControllersService) {}

  @Post('get-psychological-test-result')
  async getPsychologicalTestResult(
    @Body() body: GetPsychologicalTestResultDto,
  ): Promise<any> {
    return this.controllersService.getPsychologicalTestResult({ body });
  }
}
