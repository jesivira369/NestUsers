import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserDto } from './users.dto';
import { UsersService } from './users.service';
import { ParseDatePipe } from 'src/pipe/parse-date.pipe';

@Controller('api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ description: 'Create a new user' })
  @ApiBody({
    description: 'User data to create a new user',
    type: UserDto,
    examples: {
      user1: {
        value: {
          id: 1,
          name: 'John Doe',
          email: 'jhon@example.com',
          birthDate: '1990-01-01',
        },
      },
    },
  })
  createUser(@Body() user: UserDto) {
    return this.usersService.createUser(user);
  }

  @Get()
  @ApiQuery({ name: 'start', required: false, type: Date, description: 'Start date for birthday filter' })
  @ApiQuery({ name: 'end', required: false, type: Date, description: 'End date for birthday filter' })
  @ApiOperation({ description: 'Get all users or users filters for birthday' })
  getUsers(@Query('start', ParseDatePipe) start: Date, @Query('end', ParseDatePipe) end: Date) {
    return this.usersService.getUsers(start, end);
  }

  @Put()
  @ApiBody({
    description: 'User data to update or create an user',
    type: UserDto,
    examples: {
      user1: {
        value: {
          id: 1,
          name: 'John Doe',
          email: 'jhon@example.com',
          birthDate: '1990-01-01',
        },
      },
    },
  })
  @ApiOperation({ description: 'Update a user passing the user in body' })
  updateUser(@Body() user: UserDto) {
    return this.usersService.updateUser(user);
  }

  @Delete('/:idUser')
  @ApiParam({ name: 'idUser', required: true, type: Number, description: 'User Id to delete' })
  @ApiOperation({ description: 'Delete a user by Id' })
  @ApiBody({
    description: 'User data to delete a new user',
    examples: {
      user1: {
        value: {
          id: 1,
          name: 'John Doe',
          email: 'jhon@example.com',
        },
      },
    },
  })
  @ApiOperation({ description: 'Delete a user by Id' })
  deleteUser(@Param('idUser') idUser: number) {
    return this.usersService.deleteUser(idUser);
  }
}
