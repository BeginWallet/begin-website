const env = require('./env-config')

module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'transform-define',
      env
    ],
    [
      "formatjs",
      {
        "idInterpolationPattern": "[sha512:contenthash:base64:6]",
        "ast": true
      }
    ]
  ],
}
