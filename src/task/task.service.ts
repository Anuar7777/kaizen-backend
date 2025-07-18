import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { TaskDto } from './task.dto'

@Injectable()
export class TaskService {
	constructor(private prisma: PrismaService) {}

	async getAll(userId: string) {
		return this.prisma.task.findMany({ where: { userId } })
	}

	async create(dto: TaskDto, userId: string) {
		return this.prisma.task.create({
			data: {
				...dto,
				user: {
					connect: {
						id: userId,
					},
				},
			},
		})
	}

	async update(dto: Partial<TaskDto>, taskId: string, userId: string) {
		const task = await this.prisma.task.findUnique({
			where: { id: taskId, userId },
		})

		if (!task) {
			throw new NotFoundException('Task not found or access denied')
		}

		return this.prisma.task.update({
			where: {
				userId,
				id: taskId,
			},
			data: dto,
		})
	}

	async delete(taskId: string, userId: string) {
		const task = await this.prisma.task.findUnique({
			where: {
				id: taskId,
				userId,
			},
		})

		if (!task) {
			throw new NotFoundException('Task not found or access denied')
		}

		await this.prisma.task.delete({ where: { id: taskId } })

		return true
	}
}
