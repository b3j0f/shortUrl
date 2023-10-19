import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  host: string
  env: string
  shortUrlLength: number
}

const config: Config = {
  port: parseInt(process.env.PORT ?? '3000'),
  host: process.env.HOST ?? '0.0.0.0',
  env: process.env.NODE_ENV ?? 'development',
  shortUrlLength: parseInt(process.env.SHORT_URL_LENGTH ?? '6')
}

export default config
