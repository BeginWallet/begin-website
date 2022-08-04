// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)

const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  // assetPrefix: !debug ? '/b58.github.io/' : '',
  assetPrefix: '',
  i18n: {
    locales: ['en', 'pt-BR', 'jp', 'cn'],
    defaultLocale: 'en',
  },
  target: 'serverless',
}
