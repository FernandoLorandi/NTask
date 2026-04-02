import { TinyEmitter } from 'tiny-emitter'
import Request from 'browser-request'

class Ntask extends TinyEmitter {
  constructor() {
    super()
    // Wrapper para injetar Authorization automaticamente quando houver token.
    this.request = (options, callback) => {
      const token = localStorage.getItem('token')
      if (token) {
        options.headers = options.headers || {}
        // O backend usa ExtractJwt.fromAuthHeaderAsBearerToken()
        // Entao o header deve ser "Authorization: Bearer <token>".
        options.headers.Authorization = token
      }
      return Request(options, callback)
    }
    this.URL = 'https://localhost:3000'
  }
}

module.exports = Ntask
