import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class TimeBlockDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsOptional()
	color?: string

	@IsNumber()
	duration: number

	@IsNumber()
	@IsOptional()
	order: number
}
