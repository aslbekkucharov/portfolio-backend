import { IsEnum, IsNotEmpty, IsString } from "class-validator"
import { UserRole } from "src/types/auth"

export class CreateUserDto {
    @IsString({ message: 'Поле должно содержать текстовое значение' })
    @IsNotEmpty({ message: 'Введите ФИО' })
    name: string

    @IsString({ message: 'Поле должно содержать текстовое значение' })
    @IsNotEmpty({ message: 'Введите имя пользователя' })
    username: string

    @IsString({ message: 'Поле должно содержать текстовое значение' })
    @IsNotEmpty({ message: 'Введите пароль' })
    password: string

    @IsEnum(UserRole, { message: 'Укажите валидную роль для пользователя' })
    role: string
}