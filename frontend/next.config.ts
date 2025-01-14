import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async rewrites(){
      return [
        {
          source: '/api/:path*',
          destination: 'http://host.docker.internal:8000/api/:path*/',
        }
      ]
    }
};


export default nextConfig;