import { responseModel } from "@common/models/response.model";
import { CreateUserDto } from "@dtos/create-user.dto";
import { updateUserDto } from "@dtos/update-user.dto";
import { User } from "@prisma/client";

export abstract class AbstractUserRepository {
    abstract createUser(createUserDto: CreateUserDto): Promise<User>
    abstract loginUser(email: string, password: string): Promise<User>
    abstract updateUser(id: string, user: updateUserDto): Promise<User>
    abstract getUser(id: string): Promise<User>
    abstract deleteUser(id: string): Promise<responseModel>

}