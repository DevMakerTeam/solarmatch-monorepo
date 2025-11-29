export type ImageValidationOptions = {
  allowedExtensions?: string[];
  maxSizeBytes?: number;
};

export type ImageValidationResult = {
  isValid: boolean;
  errors: string[];
};

const DEFAULT_ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
const DEFAULT_MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

/**
 * 이미지 파일 검증 함수
 * @param files 검증할 파일 배열
 * @param options 검증 옵션 (허용된 확장자, 최대 크기)
 * @returns 검증 결과와 에러 메시지 배열
 */
export const validateImageFiles = (
  files: File[],
  options?: ImageValidationOptions
): ImageValidationResult => {
  const {
    allowedExtensions = DEFAULT_ALLOWED_EXTENSIONS,
    maxSizeBytes = DEFAULT_MAX_SIZE_BYTES,
  } = options || {};

  const errors: string[] = [];

  if (files.length === 0) {
    return { isValid: false, errors: ["파일이 선택되지 않았습니다."] };
  }

  // 지원 형식 검증
  const invalidFiles = files.filter(file => {
    const extension = file.name
      .toLowerCase()
      .substring(file.name.lastIndexOf("."));
    return !allowedExtensions.includes(extension);
  });

  if (invalidFiles.length > 0) {
    const extensions = allowedExtensions.join(", ");
    errors.push(
      `지원하지 않는 파일 형식입니다. (지원 형식: ${extensions.replace(
        /\./g,
        ""
      )})`
    );
  }

  // 파일 크기 검증
  const oversizedFiles = files.filter(file => file.size > maxSizeBytes);
  if (oversizedFiles.length > 0) {
    const maxSizeMB = (maxSizeBytes / (1024 * 1024)).toFixed(0);
    errors.push(
      `파일 크기가 ${maxSizeMB}MB를 초과합니다. (파일당 최대 ${maxSizeMB}MB)`
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
