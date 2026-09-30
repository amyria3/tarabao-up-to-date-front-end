/**
 * Gleiche Grundeinstellungen wie apps/medusa-storefront (Cache Components,
 * Lingui, Bildquellen). Die Umgebungsprüfung der Storefront fehlt bewusst,
 * da die Bibliothek ohne Medusa-Backend läuft.
 *
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  images: {
    qualities: [50, 75],
    remotePatterns: [
      { protocol: 'https', hostname: 'payload.tarabao.bio' },
      { protocol: 'http', hostname: 'localhost' },
    ],
  },
  turbopack: {
    rules: {
      '*.po': {
        loaders: ['@lingui/loader'],
        as: '*.js',
      },
    },
  },
  experimental: {
    swcPlugins: [['@lingui/swc-plugin', {}]],
  },
  async redirects() {
    return [{ source: '/', destination: '/de-de', permanent: false }]
  },
}

export default nextConfig
