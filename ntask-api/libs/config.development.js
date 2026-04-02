import logger from './logger.js'

export default {
  database: 'NTask',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'ntask.sqlite',
    logging: (sql) => {
      logger.info(`[${new Date()}] ${sql}`)
    },
    define: {
      underscored: true,
    },
  },
  jwtSecret: 'Ntask_API',
  jwtSession: {
    session: false,
  },
}
