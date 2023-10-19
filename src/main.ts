import app from './loaders/app'
import config from './config'

app.listen(config.port, config.host, () => {
  console.log(`Express is listening at http://${config.host}:${config.port}`)
})
