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
import { TaskService } from './task.service'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { TaskDto } from './task.dto'

@Controller('user/tasks')
export class TaskController {
	constructor(private readonly TaskService: TaskService) {}

	@Auth()
	@Get()
	async getAll(@CurrentUser('id') userId: string) {
		return this.TaskService.getAll(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	async create(@Body() dto: TaskDto, @CurrentUser('id') userId: string) {
		return this.TaskService.create(dto, userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	async update(
		@Body() dto: TaskDto,
		@Param('id') taskId: string,
		@CurrentUser('id') userId: string,
	) {
		return this.TaskService.update(dto, taskId, userId)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	async delete(@Param('id') id: string, @CurrentUser('id') userId: string) {
		return this.TaskService.delete(id, userId)
	}
}
