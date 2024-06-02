import { IsBoolean, IsNotEmpty, IsString } from "class-validator"

export class CreatePostDto {
    @IsString({ message: 'Поле title должно содержать значение типа string' })
    @IsNotEmpty({ message: 'Поле title обязательно к заполнению' })
    title: string

    @IsString({ message: 'Поле content должно содержать значение типа string' })
    @IsNotEmpty({ message: 'Поле content обязательно к заполнению' })
    content: string

    @IsBoolean({ message: 'Поле isActive должно содержать значение типа boolean' })
    isActive: boolean
}