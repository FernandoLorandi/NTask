import passport from 'passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

module.exports = (app) => {
  const Users = app.db.models.Users
  const config = app.libs.config
  const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  }

  const strategy = new Strategy(params, (payload, done) => {
    // payload gerado em routes/token.js: { id: user.id }
    const { id } = payload

    Users.findOne({ where: { id } })
      .then((user) => {
        if (user) {
          return done(null, {
            id: user.id,
            email: user.email,
          })
        }
        return done(null, false)
      })
      .catch((error) => done(error, null))
  })
  passport.use(strategy)

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', config.jwtSession),
  }
}
