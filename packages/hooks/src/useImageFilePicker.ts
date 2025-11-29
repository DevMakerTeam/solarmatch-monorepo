import { useRef, useCallback } from "react";
import { useToastStore } from "./useToastStore";

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
const validateImageFiles = (
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

export { validateImageFiles };

export type UseImageFilePickerOptions = ImageValidationOptions & {
  /**
   * 검증 성공 후 실행할 액션 함수
   */
  onValidFiles: (files: File[]) => void;
  /**
   * 여러 파일 선택 허용 여부
   * @default true
   */
  multiple?: boolean;
  /**
   * 허용된 파일 확장자를 accept 속성에 사용할 형식으로 변환
   * @default true
   */
  accept?: string;
};

/**
 * 이미지 파일 선택을 위한 React hook
 * @param options 옵션 객체
 * @returns fileInputRef, openFilePicker, handleFileChange
 */
export const useImageFilePicker = (options: UseImageFilePickerOptions) => {
  const {
    onValidFiles,
    multiple = true,
    accept = "image/jpeg,image/jpg,image/png,image/gif,image/webp",
    ...validationOptions
  } = options;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const showToast = useToastStore(state => state.show);

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      e => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        // 파일 검증
        const validation = validateImageFiles(files, validationOptions);

        if (!validation.isValid) {
          // 첫 번째 에러만 표시
          showToast(validation.errors[0] || "파일 검증에 실패했습니다.");
          e.currentTarget.value = "";
          return;
        }

        // 검증 통과 시 액션 실행
        onValidFiles(files);

        // 같은 파일 재선택 가능하도록 value 초기화
        e.currentTarget.value = "";
      },
      [onValidFiles, validationOptions, showToast]
    );

  return {
    fileInputRef,
    openFilePicker,
    handleFileChange,
    accept,
    multiple,
  };
};
