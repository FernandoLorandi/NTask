import Ntask from '../ntask.js'
import Template from '../templates/signup.js'

class Signup extends Ntask {
  constructor(body) {
    super()
    this.body = body
  }

  render() {
    this.body.innerHTML = Template.render()
    this.body.querySelector('[data-name]').focus()
    this.addEventListener()
  }

  addEventListener() {
    this.formSubmit()
  }

  formSubmit() {
    const form = this.body.querySelector('form')
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const name = e.target.querySelector('[data-name]')
      const email = e.target.querySelector('[data-email]')
      const password = e.target.querySelector('[data-password]')
      const options = {
        method: 'POST',
        url: `${this.URL}/users`,
        json: true,
        body: {
          name: name.value,
          email: email.value,
          password: password.value,
        },
      }
      this.request(options, (err, resp, data) => {
        if (err) {
          this.emit('error', err)
          console.log(err)
          return
        }

        if (!resp || resp.statusCode === 412) {
          this.emit('error', new Error('Cadastro invalido'))
          return
        }

        if (resp.statusCode < 200 || resp.statusCode > 299) {
          this.emit('error', new Error(`HTTP ${resp.statusCode}`))
          return
        }

        this.emit('signup', data)
        console.log(data)
      })
    })
  }
}

module.exports = Signup
