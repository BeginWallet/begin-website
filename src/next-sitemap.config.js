/** @type {import('next-sitemap').IConfig} */

// Only the homepage is translated (components/transition/i18n.ts). Other pages under a
// language prefix (/es/blog, /zh-Hans/docs…) are the same English pages, so they stay out of
// the sitemap to avoid duplicate URLs in search.
const LOCALES = ['es', 'pt-BR', 'id', 'zh-Hans', 'zh-Hant', 'ja']

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://begin.is',
  generateRobotsTxt: true, // (optional)
  exclude: LOCALES.map((l) => `/${l}/*`),
  // The exclude above also drops the translated homepages, so add them back.
  additionalPaths: async (config) => Promise.all(LOCALES.map((l) => config.transform(config, `/${l}`))),
}
