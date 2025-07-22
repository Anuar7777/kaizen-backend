import { IsBoolean } from 'class-validator'

export class PomodoroSessionDto {
	@IsBoolean()
	isCompleted: boolean
}
