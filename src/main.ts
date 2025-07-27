import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'
import { Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

const logger = new Logger('Bootstrap')

async function bootstrap() {
	try {
		const app = await NestFactory.create(AppModule)

		const configService = app.get(ConfigService)

		app.setGlobalPrefix('api')
		app.use(cookieParser())
		app.enableCors({
			origin: [configService.get('CLIENT_URL', 'http://localhost:3000')],
			credentials: true,
			exposedHeaders: 'set-cookie',
		})

		await app.listen(configService.get('PORT', 5000))
	} catch (error) {
		logger.error('Error when starting the server: ', error)
		process.exit(1)
	}
}

void bootstrap()
