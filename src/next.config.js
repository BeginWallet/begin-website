// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)

const debug = process.env.NODE_ENV !== 'production'

module.exports = {
  // assetPrefix: !debug ? '/b58.github.io/' : '',
  assetPrefix: undefined,
  i18n: {
    locales: ['en', 'pt-BR', 'jp', 'cn'],
    defaultLocale: 'en',
  },
  // target: 'serverless',
  experimental: {
    // appDir: true, 
    // isrMemoryCacheSize: 0,
  }
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    return config;
  },
};

module.exports = nextConfig;