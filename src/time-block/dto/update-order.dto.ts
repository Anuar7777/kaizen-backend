import { IsArray, IsNotEmpty, IsString } from 'class-validator'

export class UpdateOrderDto {
	@IsNotEmpty()
	@IsArray()
	@IsString({ each: true })
	ids: string[]
}
