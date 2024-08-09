import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator'

export class CreatePostDto {
  @IsString({ message: 'Поле title должно содержать значение типа string' })
  @IsNotEmpty({ message: 'Поле title обязательно к заполнению' })
  title: string

  @IsString({ message: 'Поле content должно содержать значение типа string' })
  @IsNotEmpty({ message: 'Поле content обязательно к заполнению' })
  content: string

  @MaxLength(200, { message: 'Максимальная длина краткого описания 200 символов' })
  @IsString({ message: 'Поле excerpt должно содержать значение типа string' })
  @IsNotEmpty({ message: 'Поле excerpt обязательно к заполнению' })
  excerpt: string

  @IsBoolean({ message: 'Поле isActive должно содержать значение типа boolean' })
  isActive: boolean
}
