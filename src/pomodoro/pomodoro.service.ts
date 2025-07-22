import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { PomodoroSessionDto } from './dto/pomodoro-session.dto'
import { PomodoroRoundDto } from './dto/pomodoro-round.dto'

@Injectable()
export class PomodoroService {
	constructor(private prisma: PrismaService) {}

	async getTodaySession(userId: string) {
		const today = new Date().toISOString().split('T')[0]

		return this.prisma.pomodoroSession.findFirst({
			where: {
				createdAt: { gte: new Date(today) },
				userId,
			},
			include: {
				rounds: {
					orderBy: {
						id: 'asc',
					},
				},
			},
		})
	}

	async create(userId: string) {
		const todaySession = await this.getTodaySession(userId)

		if (todaySession) {
			return todaySession
		}

		// TODO: then transfer this logic to user.service
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			select: { intervalCount: true },
		})

		if (!user) {
			throw new NotFoundException('User not found')
		}

		return this.prisma.pomodoroSession.create({
			data: {
				rounds: {
					createMany: {
						data: Array.from({ length: user.intervalCount }, () => ({
							totalSeconds: 0,
						})),
					},
				},
				user: {
					connect: { id: userId },
				},
			},
			include: {
				rounds: true,
			},
		})
	}

	async update(
		dto: Partial<PomodoroSessionDto>,
		sessionId: string,
		userId: string,
	) {
		const session = await this.prisma.pomodoroSession.findUnique({
			where: {
				id: sessionId,
				userId,
			},
		})

		if (!session) {
			throw new NotFoundException('Session not found')
		}

		return this.prisma.pomodoroSession.update({
			where: {
				id: sessionId,
				userId,
			},
			data: dto,
		})
	}

	async updateRound(dto: Partial<PomodoroRoundDto>, roundId: string) {
		const round = await this.prisma.pomodoroRound.findUnique({
			where: {
				id: roundId,
			},
		})

		if (!round) {
			throw new NotFoundException('Round not found')
		}

		return this.prisma.pomodoroRound.update({
			where: {
				id: roundId,
			},
			data: dto,
		})
	}

	async deleteSession(sessionId: string, userId: string) {
		const session = await this.prisma.pomodoroSession.findUnique({
			where: {
				id: sessionId,
				userId,
			},
		})

		if (!session) {
			throw new NotFoundException('Session not found')
		}

		await this.prisma.pomodoroSession.delete({
			where: {
				id: sessionId,
				userId,
			},
		})

		return true
	}
}
