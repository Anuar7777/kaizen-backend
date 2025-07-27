import { Transform } from 'class-transformer'
import {
	IsBoolean,
	IsEnum,
	IsNotEmpty,
	IsOptional,
	IsString,
} from 'class-validator'
import { Priority } from '@prisma/client'

export class TaskDto {
	@IsString()
	@IsNotEmpty()
	name: string

	@IsBoolean()
	@IsOptional()
	isCompleted?: boolean

	@IsString()
	@IsOptional()
	createdAt?: string

	@IsEnum(Priority)
	@IsOptional()
	@Transform(({ value }) => ('' + value).toLowerCase())
	priority?: Priority
}
