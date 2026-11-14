// This file is not going through babel transformation.
// So, we write it in vanilla JS
// (But you could use ES2015 features supported by your Node.js version)

const debug = process.env.NODE_ENV !== 'production'

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/download', destination: '/#download', permanent: false },
    ];
  },
  // assetPrefix: !debug ? '/b58.github.io/' : '',
  // headers: async () => [
  //   {
  //     source: "/(.*)",
  //     headers: [
  //       {
  //         key: 'X-Frame-Options',
  //         value: 'DENY',
  //       },
  //       {
  //         key: 'Content-Security-Policy',
  //         value: "default-src 'unsafe-inline' https:; script-src 'unsafe-inline' https:; frame-ancestors 'none';",
  //       },
  //       {
  //         key: 'Referrer-Policy',
  //         value: 'no-referrer',
  //       },
  //       {
  //         key: 'Permissions-Policy',
  //         value: 'camera=(), microphone=(), geolocation=()',
  //       },  
  //     ],
  //   },
  // ],
  assetPrefix: undefined,
  i18n: {
    // Keep in step with LOCALES in components/transition/i18n.ts.
    locales: ['en', 'es', 'pt-BR', 'id', 'zh-Hans', 'zh-Hant', 'ja'],
    // No automatic redirects by browser language (keeps every language indexable); the landing
    // page suggests the visitor's language instead. See components/transition/i18n.ts.
    localeDetection: false,
    defaultLocale: 'en',
  },
  // target: 'serverless',
  experimental: {
    // appDir: true, 
    // isrMemoryCacheSize: 0,
  },
  reactStrictMode: true,

  webpack: function (config, { isServer, dev }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    if (!dev && isServer) {
      config.output.webassemblyModuleFilename = "chunks/[id].wasm";
      config.plugins.push(new WasmChunksFixPlugin());
    }

    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

class WasmChunksFixPlugin {
  apply(compiler) {
    compiler.hooks.thisCompilation.tap("WasmChunksFixPlugin", (compilation) => {
      compilation.hooks.processAssets.tap(
        { name: "WasmChunksFixPlugin" },
        (assets) =>
          Object.entries(assets).forEach(([pathname, source]) => {
            if (!pathname.match(/\.wasm$/)) return;
            compilation.deleteAsset(pathname);

            const name = pathname.split("/")[1];
            const info = compilation.assetsInfo.get(pathname);
            compilation.emitAsset(name, source, info);
          })
      );
    });
  }
}


export default nextConfig


