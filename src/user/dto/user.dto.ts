import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'
import { pomodoroSettingsDto } from './pomodoroSettings.dto'

export class userDto extends pomodoroSettingsDto {
	@IsOptional()
	@IsEmail()
	email?: string

	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	@MinLength(6, { message: 'Password must be at least 6 characters long' })
	password?: string
}
