const prod = process.env.NODE_ENV === 'production'

module.exports = {
  // 'process.env.BACKEND_URL': prod ? '/b58.github.io' : '',
  'process.env.BACKEND_URL': '',
}
