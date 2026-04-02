import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'

let db = null

module.exports = (app) => {
  if (!db) {
    const config = app.libs.config
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params
    )
    db = {
      sequelize,
      Sequelize,
      models: {},
    }

    const dir = path.join(__dirname, 'models')
    fs.readdirSync(dir).forEach((file) => {
      const modelDir = path.join(dir, file)
      const modelDefiner = require(modelDir)
      const model = modelDefiner(sequelize, Sequelize.DataTypes)
      db.models[model.name] = model
    })
    Object.keys(db.models).forEach((key) => {
      if (typeof db.models[key].associate === 'function') {
        db.models[key].associate(db.models)
      }
    })
  }
  return db
}
