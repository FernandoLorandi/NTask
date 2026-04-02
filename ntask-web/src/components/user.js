import Ntask from '../ntask.js'
import Template from '../templates/user.js'

class User extends Ntask {
  constructor(body) {
    super()
    this.body = body
  }

  render() {
    this.renderUserData()
  }

  addEventListener() {
    this.userCancelClick()
  }

  renderUserData() {
    const options = {
      method: 'GET',
      url: `${this.URL}/user`,
      json: true,
    }
    this.request(options, (err, resp, data) => {
      if (err || (resp && resp.statusCode === 412)) {
        this.emit('error', err)
      } else {
        this.body.innerHTML = Template.render(data)
        this.addEventListener()
      }
    })
  }

  userCancelClick() {
    const button = this.body.querySelector('[data-remove-account]')
    if (!button) return
    button.addEventListener('click', (e) => {
      e.preventDefault()
      if (!confirm('Tem certeza que deseja excluir sua conta?')) return

      const options = {
        method: 'DELETE',
        url: `${this.URL}/user`,
      }

      this.request(options, (err, resp, data) => {
        if (err || (resp && resp.statusCode === 412)) {
          this.emit('remove-error', err)
        } else {
          this.emit('remove-account')
        }
      })
    })
  }
}

module.exports = User
