import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';
import { HabitService } from './habit.service';
import { HabitController } from './habit.controller';

@Module({
  controllers: [HabitController],
  providers: [HabitService],
  imports: [PrismaModule],
})
export class HabitModule {}
