import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { PomodoroService } from './pomodoro.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { PomodoroRoundDto } from './dto/pomodoro-round.dto'
import { PomodoroSessionDto } from './dto/pomodoro-session.dto'

@Controller('user/timer')
export class PomodoroController {
	constructor(private readonly pomodoroService: PomodoroService) {}

	@Auth()
	@Get('today')
	async getTodaySession(@CurrentUser('id') userId: string) {
		return this.pomodoroService.getTodaySession(userId)
	}

	@Auth()
	@Post()
	@HttpCode(200)
	async create(@CurrentUser('id') userId: string) {
		return this.pomodoroService.create(userId)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Put('round/:id')
	@HttpCode(200)
	async updateRound(
		@Body() dto: PomodoroRoundDto,
		@Param('id') roundId: string,
	) {
		return this.pomodoroService.updateRound(dto, roundId)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@Put(':id')
	@HttpCode(200)
	async update(
		@Body() dto: PomodoroSessionDto,
		@Param('id') sessionId: string,
		@CurrentUser('id') userId: string,
	) {
		return this.pomodoroService.update(dto, sessionId, userId)
	}

	@Auth()
	@Delete(':id')
	@HttpCode(200)
	async deleteSession(
		@Param('id') sessionId: string,
		@CurrentUser('id') userId: string,
	) {
		return this.pomodoroService.deleteSession(sessionId, userId)
	}
}
