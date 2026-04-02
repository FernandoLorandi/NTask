import Ntask from '../ntask.js'
import Template from '../templates/taskForm.js'

class TaskForm extends Ntask {
  constructor(body) {
    super()
    this.body = body
  }

  render() {
    this.body.innerHTML = Template.render()
    this.body.querySelector('[data-task]').focus()
    this.addEventListener()
  }

  addEventListener() {
    this.formSubmit()
  }

  formSubmit() {
    const form = this.body.querySelector('form')
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const task = e.target.querySelector('[data-task]')
      const options = {
        method: 'POST',
        url: `${this.URL}/tasks`,
        json: true,
        body: {
          title: task.value,
        },
      }

      this.request(options, (err, resp, data) => {
        if (err || (resp && resp.statusCode === 412)) {
          this.emit('error', err)
        } else {
          this.emit('submit')
        }
      })
    })
  }
}

module.exports = TaskForm
