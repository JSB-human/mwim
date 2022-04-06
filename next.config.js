/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites(){

      return [
        {
          source : "/spring/:path*",
          destination : process.env.DESTINATION_URL,
        },
      ]
    
  }
}

module.exports = nextConfig
