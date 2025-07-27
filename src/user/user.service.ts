import { Injectable, NotFoundException } from '@nestjs/common'
import { hash } from 'argon2'
import { User } from '@prisma/client'
import { AuthDto } from 'src/auth/dto/auth.dto'
import { PrismaService } from 'src/prisma.service'
import { userDto } from './dto/user.dto'
import { startOfDay, subDays } from 'date-fns'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	getById(id: string) {
		return this.prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				tasks: true,
			},
		})
	}

	getByEmail(email: string): Promise<User | null> {
		return this.prisma.user.findUnique({
			where: { email },
		})
	}

	async getProfile(id: string) {
		const profile = await this.getById(id)

		if (!profile) {
			throw new NotFoundException('User not found')
		}

		// TODO: separate this logic into the getStatistics method in task.service
		const todayStart = startOfDay(new Date())
		const weekStart = startOfDay(subDays(new Date(), 7))

		const [
			totalTasksCount,
			completedTasksCount,
			todayTasksCount,
			weekTasksCount,
		] = await Promise.all([
			this.prisma.task.count({ where: { userId: profile.id } }),
			this.prisma.task.count({
				where: { userId: profile.id, isCompleted: true },
			}),
			this.prisma.task.count({
				where: {
					userId: profile.id,
					createdAt: { gte: todayStart.toISOString() },
				},
			}),
			this.prisma.task.count({
				where: {
					userId: profile.id,
					createdAt: {
						gte: weekStart.toISOString(),
					},
				},
			}),
		])

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password, ...rest } = profile

		return {
			user: rest,
			statistics: [
				{ label: 'Total', value: totalTasksCount },
				{ label: 'Completed tasks', value: completedTasksCount },
				{ label: 'Today tasks', value: todayTasksCount },
				{ label: 'Week tasks', value: weekTasksCount },
			],
		}
	}

	async create(dto: AuthDto) {
		const user = {
			email: dto.email,
			name: '',
			password: await hash(dto.password),
		}

		return this.prisma.user.create({
			data: user,
		})
	}

	async update(id: string, dto: userDto) {
		let data = dto

		if (dto.password) {
			data = { ...dto, password: await hash(dto.password) }
		}

		return this.prisma.user.update({
			where: { id },
			data,
			select: { email: true, name: true },
		})
	}
}
