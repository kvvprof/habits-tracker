import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Users } from '@prisma/client';

export class UserType implements Users {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class UserResponseType extends OmitType(UserType, [
  'password',
] as const) {
  @ApiProperty()
  accessToken: string;
}
