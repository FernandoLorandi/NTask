module.exports = (app) => {
  const Users = app.db.models.Users

  app
    .route('/user')
    .all(app.auth.authenticate())
    .get((req, res) => {
      Users.findOne({ where: { id: req.user.id }, attributes: ['id', 'name', 'email'] })
        .then((result) => {
          if (result) {
            res.json(result)
          } else {
            res.sendStatus(404)
          }
        })
        .catch((error) => {
          res.status(412).json({ msg: error.message })
        })
    })
    .delete((req, res) => {
      Users.destroy({ where: { id: req.user.id } })
        .then((result) => res.sendStatus(204))
        .catch((error) => {
          res.status(412).json({ msg: error.message })
        })
    })
  app.post('/users', (req, res) => {
    const body = req.body
    Users.create(body)
      .then((result) => res.json(result))
      .catch((error) => {
        res.status(412).json({ msg: error.message })
      })
  })
}
