import Ntask from '../ntask.js'
import Template from '../templates/signin.js'

class Signin extends Ntask {
  constructor(body) {
    super()
    this.body = body
  }

  render() {
    this.body.innerHTML = Template.render()
    this.body.querySelector('[data-email]').focus()
    this.addEventListener()
  }
  addEventListener() {
    this.formSubmit()
    this.signinClick()
  }

  formSubmit() {
    const form = this.body.querySelector('form')
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const email = e.target.querySelector('[data-email]')
      const password = e.target.querySelector('[data-password]')
      const options = {
        method: 'POST',
        url: `${this.URL}/token`,
        json: true,
        body: {
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

        if (!resp || resp.statusCode === 401) {
          this.emit('error', new Error('Unauthorized'))
          return
        }

        if (resp.statusCode < 200 || resp.statusCode > 299) {
          this.emit('error', new Error(`HTTP ${resp.statusCode}`))
          return
        }

        if (!data || !data.token) {
          this.emit('error', new Error('Resposta invalida: token ausente'))
          return
        }

        this.emit('signin', data.token)
        console.log(data.token)
      })
    })
  }
  signinClick() {
    const signup = this.body.querySelector('[data-signup]')
    signup.addEventListener('click', (e) => {
      e.preventDefault()
      this.emit('signup')
    })
  }
}

module.exports = Signin
