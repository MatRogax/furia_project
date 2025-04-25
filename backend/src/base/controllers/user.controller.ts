import { CreateUserDto } from '@dtos/create-user.dto';
import { updateUserDto } from '@dtos/update-user.dto';
import { Body, Controller, Get, Param, Post, Put, UsePipes } from '@nestjs/common';
import { PasswordHasherPipe } from '@pipes/hasher-password.pipe';
import { User } from '@prisma/client';
import { AbstractUserRepository } from '@repositories/user/abstract-user.repository';

@Controller('usuario')
export class UserController {
  constructor(private readonly repository: AbstractUserRepository) { }

  @Post('cadastro')
  @UsePipes(new PasswordHasherPipe<CreateUserDto>())
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    const response = await this.repository.createUser(user);
    return response;
  }

  @Put('atualizar/:id')
  @UsePipes(new PasswordHasherPipe<CreateUserDto>())
  async updateUser(@Param('id') id: string, @Body() user: updateUserDto): Promise<User> {
    const response = await this.repository.updateUser(id, user);
    return response;
  }

  @Get(':id')
  async finUser(@Param('id') id: string): Promise<User> {
    const response = await this.repository.getUser(id);
    return response;
  }

}
