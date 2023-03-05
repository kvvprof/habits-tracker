import { UserService } from './../user/user.service ';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly userService: UserService,
  ) {}

  async resetPassword(email: string): Promise<string> {
    const newPassword: string = await this.userService.resetPassword(email);

    await this.mailerService.sendMail({
      to: email,
      from: 'Habits Tracker<support@habits-tracker.ru>',
      replyTo: 'support@habits-tracker.ru',
      subject: 'Новый пароль',
      template: 'resetPassword',
      context: {
        password: newPassword,
      },
    });

    return 'Password successfully reset';
  }
}
