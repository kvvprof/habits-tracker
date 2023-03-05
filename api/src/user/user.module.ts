import { UserService } from './user.service ';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [PrismaModule, AuthModule],
  exports: [UserService],
})
export class UserModule {}
