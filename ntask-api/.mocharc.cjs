module.exports = {
  require: ['babel/register', 'test/helpers.js'],
  spec: ['test/**/*.js'],
  reporter: 'spec',
  slow: 5000,
}
