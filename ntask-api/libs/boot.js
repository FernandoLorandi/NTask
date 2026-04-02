import https from 'https'
import fs from 'fs'
import { http } from 'winston'

module.exports = (app) => {
  if (process.env.NODE_ENV !== 'test') {
    const credentials = {
      key: fs.readFileSync('server.key', 'utf-8'),
      cert: fs.readFileSync('server.crt', 'utf-8'),
    }

    app.db.sequelize
      .sync()
      .then(() => {
        https.createServer(credentials, app)
        .listen(app.get('port'), () => {
          console.log(`NTask API - Porta ${app.get('port')}`)
        })
      })
      .catch((error) => {
        console.error('Erro ao iniciar a aplicacao:', error)
        process.exit(1)
      })
  }
}
