/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  nextConfig,
  env: {
    API_URL : process.env.API_URL,
    SOLANA_RPC_URL : process.env.SOLANA_RPC_URL,
  }
}
