import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { Roles } from 'src/enums/roles.enum'

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

  @IsEnum(Roles, { message: 'Укажите валидную роль для пользователя' })
  role: Roles
}
