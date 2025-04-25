import { responseModel } from '@common/models/response.model';
import { CreateUserDto } from '@dtos/create-user.dto';
import { LoginDto } from '@dtos/login-dto';
import { updateUserDto } from '@dtos/update-user.dto';
import { Body, Controller, Get, HttpCode, Param, Post, Put, UsePipes } from '@nestjs/common';
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

  @Post('login')
  @HttpCode(200)
  async loginUser(@Body() credentialUser: LoginDto): Promise<responseModel> {
    const response = await this.repository.loginUser(credentialUser.email, credentialUser.password);
    return response;
  }

}
