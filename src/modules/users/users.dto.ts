import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsEmail, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'User Id',
    type: 'number',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    description: 'User name',
    type: 'string',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'User email',
    type: 'string',
    example: 'jhon@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'User birth date',
    type: 'Date',
    example: '1990-01-01',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  birthDate: Date;
}
