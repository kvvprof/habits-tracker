import { AuthModule } from '../auth/auth.module';
import { UserHabitService } from './userHabit.service';
import { UserHabitController } from './userHabit.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserHabitController],
  providers: [UserHabitService],
  imports: [PrismaModule, AuthModule],
})
export class UserHabitModule {}
