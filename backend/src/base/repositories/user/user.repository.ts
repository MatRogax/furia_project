import { responseModel } from "@common/models/response.model";
import { Utils } from "@common/utils/utils";
import { PrismaService } from "@database/prisma.service";
import { CreateUserDto } from "@dtos/create-user.dto";
import { updateUserDto } from "@dtos/update-user.dto";
import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "@prisma/client";
import { AbstractUserRepository } from "@repositories/user/abstract-user.repository";

@Injectable()
export class UserRepository implements AbstractUserRepository {
    constructor(private readonly prismaService: PrismaService) { }
    async createUser(user: CreateUserDto): Promise<User> {
        try {
            const createUser = this.prismaService.user.create({
                data: {
                    ...user
                }
            })
            return createUser;
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async loginUser(email: string, password: string): Promise<User> {

        const user = await this.prismaService.user.findUnique({
            where: {
                email: email
            }
        });

        const isPasswordValid = await Utils.matchPassword(password, user.password);

        if (!user || !isPasswordValid) {
            throw new UnauthorizedException('Usuário e/ou senha inválidos');
        }

        return user;

    }

    async updateUser(id: string, user: updateUserDto): Promise<User> {
        try {
            const updateUser = this.prismaService.user.update({
                where: {
                    id: id
                },
                data: user
            })
            return updateUser;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    async getUser(id: string): Promise<any> {
        try {
            const foundedUser = this.prismaService.user.findUnique({
                where: {
                    id: id
                }
            })
            return foundedUser;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
    async deleteUser(id: string): Promise<responseModel> {
        try {
            const deletedUser = await this.prismaService.user.delete({
                where: {
                    id: id
                }
            })
            const deleteResponse: responseModel = {
                data: deletedUser,
                message: "usuário deletado com sucesso",
            }
            return deleteResponse;
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }
}