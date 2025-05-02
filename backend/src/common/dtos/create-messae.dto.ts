import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export enum Role {
    USER = 'USER',
    BOT = 'BOT',
}

export class CreateMessageDto {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsEnum(Role, { message: 'Role must be either USER or BOT' })
    role: Role;

    @IsNotEmpty()
    @IsUUID()
    conversationId: string;

    @IsOptional()
    @IsUUID()
    userId?: string;
}
