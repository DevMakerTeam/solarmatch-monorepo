/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 모노레포 내부 패키지를 Next 빌드 파이프라인으로 트랜스파일
  transpilePackages: ['@repo/ui'],
  // 바깥 디렉터리(import 외부) 허용
  experimental: { externalDir: true },
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    // @svgr/webpack 설정
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = nextConfig;
