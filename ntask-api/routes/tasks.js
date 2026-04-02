module.exports = (app) => {
  const Tasks = app.db.models.Tasks

  app
    .route('/tasks')
    .all(app.auth.authenticate())
    .get((req, res) => {
      // O Sequelize cria o atributo de associacao como `UserId` (field: user_id)
      Tasks.findAll({ where: { UserId: req.user.id } })
        .then((result) => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message })
        })
    })
    .post((req, res) => {
      // Garante o vinculo da task com o usuario autenticado
      req.body.UserId = req.user.id
      Tasks.create(req.body)
        .then((result) => res.json(result))
        .catch((error) => {
          res.status(412).json({ msg: error.message })
        })
    })

  app
    .route('/tasks/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      const id = req.params.id
      Tasks.findOne({ where: { id, UserId: req.user.id } })
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
    .put((req, res) => {
      const id = req.params.id
      Tasks.update(req.body, { where: { id, UserId: req.user.id } })
        .then((result) => res.sendStatus(204))
        .catch((error) => {
          res.status(412).json({ msg: error.message })
        })
    })
    .delete((req, res) => {
      const id = req.params.id
      Tasks.destroy({ where: { id, UserId: req.user.id } })
        .then((result) => res.sendStatus(204))
        .catch((error) => {
          res.status(412).json({ msg: error.message })
        })
    })
}
