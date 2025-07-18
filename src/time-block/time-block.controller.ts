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
import { TimeBlockService } from './time-block.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { TimeBlockDto } from './dto/time-block.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Controller('user/time-blocks')
export class TimeBlockController {
	constructor(private readonly timeBlockService: TimeBlockService) {}

	@Auth()
	@Get()
	async getAll(@CurrentUser('id') userId: string) {
		return this.timeBlockService.getAll(userId)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post()
	async create(@Body() dto: TimeBlockDto, @CurrentUser('id') userId: string) {
		return this.timeBlockService.create(dto, userId)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put('update-order')
	async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
		return this.timeBlockService.updateOrder(updateOrderDto.ids)
	}

	@Auth()
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Put(':id')
	async update(
		@Param('id') timeBlockId: string,
		@Body() dto: Partial<TimeBlockDto>,
		@CurrentUser('id') userId: string,
	) {
		return this.timeBlockService.update(dto, timeBlockId, userId)
	}

	@Auth()
	@HttpCode(200)
	@Delete(':id')
	async delete(
		@Param('id') timeBlockId: string,
		@CurrentUser('id') userId: string,
	) {
		return this.timeBlockService.delete(timeBlockId, userId)
	}
}
