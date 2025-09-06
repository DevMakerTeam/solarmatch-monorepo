/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 모노레포 내부 패키지를 Next 빌드 파이프라인으로 트랜스파일
  transpilePackages: ['@repo/ui'],
  // 바깥 디렉터리(import 외부) 허용
  experimental: { externalDir: true },
};

module.exports = nextConfig;
