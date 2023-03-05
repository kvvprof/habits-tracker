import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { HabitModule } from './habit/habit.module';
import { UserModule } from './user/user.module';
import { UserHabitModule } from './userHabit/userHabit.module';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    HabitModule,
    UserModule,
    UserHabitModule,
    MailModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
      template: {
        dir: join(__dirname, 'mail/templates'),
        adapter: new HandlebarsAdapter(),
      },
    }),
  ],
})
export class AppModule {}
