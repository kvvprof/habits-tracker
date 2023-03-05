import { UserModule } from '../user/user.module';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [MailController],
  providers: [MailService],
  imports: [UserModule],
})
export class MailModule {}
