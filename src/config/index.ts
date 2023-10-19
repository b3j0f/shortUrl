import dotenv from 'dotenv'

dotenv.config()

interface Config {
  port: number
  host: string
  env: string
  shortUrlLength: number
}

const config: Config = {
  port: parseInt(process.env.PORT ?? '3000'), // server port
  host: process.env.HOST ?? '0.0.0.0', // server host
  env: process.env.NODE_ENV ?? 'development', // server environment
  shortUrlLength: parseInt(process.env.SHORT_URL_LENGTH ?? '6') // length of short url
}

export default config
