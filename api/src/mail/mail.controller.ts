import { MailService } from './mail.service';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { Controller, Query, Get } from '@nestjs/common';

@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @ApiCreatedResponse({
    type: String,
    description: 'Password successfully reset',
  })
  @Get('reset-password')
  async resetPassword(@Query('email') email: string) {
    return await this.mailService.resetPassword(email);
  }
}
