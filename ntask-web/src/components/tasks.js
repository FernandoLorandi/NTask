import Ntask from '../ntask.js'
import Template from '../templates/tasks.js'

class Tasks extends Ntask {
  constructor(body) {
    super()
    this.body = body
  }

  render() {
    this.renderTaskList()
  }

  addEventListener() {
    this.taksDoneCheckbox()
    this.taskRemoveClick()
  }

  renderTaskList() {
    const options = {
      method: 'GET',
      url: `${this.URL}/tasks`,
      json: true,
    }

    this.request(options, (err, resp, data) => {
      if (err) {
        this.emit('error', err)
      } else {
        this.body.innerHTML = Template.render(data)
        this.addEventListener()
      }
    })
  }

  taksDoneCheckbox() {
    const dones = this.body.querySelectorAll('[data-done]')
    for (let i = 0, max = dones.length; i < max; i++) {
      dones[i].addEventListener('click', (e) => {
        e.preventDefault()
        const id = e.target.getAttribute('data-task-id')
        const done = e.target.getAttribute('data-task-done') === 'true'
        const options = {
          method: 'PUT',
          url: `${this.URL}/tasks/${id}`,
          json: true,
          body: { done: !done },
        }
        this.request(options, (err, resp, data) => {
          if (err || (resp && resp.statusCode === 412)) {
            this.emit('update-error', err)
          } else {
            this.emit('update')
          }
        })
      })
    }
  }

  taskRemoveClick() {
    const removes = this.body.querySelectorAll('[data-remove]')
    for (let i = 0, max = removes.length; i < max; i++) {
      removes[i].addEventListener('click', (e) => {
        e.preventDefault()
        if (!confirm('Deseja excluir esta tarefa?')) return

        const id = e.target.getAttribute('data-task-id')
        const options = {
          method: 'DELETE',
          url: `${this.URL}/tasks/${id}`,
        }

        this.request(options, (err, resp, data) => {
          if (err || (resp && resp.statusCode === 412)) {
            this.emit('remove-error', err)
          } else {
            this.emit('remove')
          }
        })
      })
    }
  }
}

module.exports = Tasks
