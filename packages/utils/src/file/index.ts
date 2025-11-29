// 파일 크기 포맷팅 함수 (bytes -> KB, MB)
export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
};

export * from "./image-validation";
