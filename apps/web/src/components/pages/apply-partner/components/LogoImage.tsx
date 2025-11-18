import Image from "next/image";
import { Icon } from "@repo/ui/icon";
import { Button } from "@repo/ui/button";
import { useRef } from "react";
import { isNotNullish } from "@repo/types";

interface LogoImageProps {
  uploadLogoImage: (file: File) => void;
  deleteLogoImage: () => void;
  url: string | undefined;
  logoImageId: number | undefined;
}

const LogoImage = ({
  deleteLogoImage,
  uploadLogoImage,
  url,
  logoImageId,
}: LogoImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const file = e.target.files?.[0];
    if (file) {
      uploadLogoImage(file);
      // 같은 파일 재선택 가능하도록 value 초기화
      e.currentTarget.value = "";
    }
  };

  return (
    <div className="w-full flex gap-[30px] mb-[50px] lg:mb-[40px]">
      <div className="min-w-[75px] h-[75px] lg:min-w-[95px] lg:h-[95px] rounded-full relative overflow-hidden flex items-center justify-center bg-border-color">
        {url && isNotNullish(logoImageId) ? (
          <Image src={url} alt="partner-logo" fill className="object-cover" />
        ) : (
          <Icon iconName="photo" className="w-[38%] h-[38%] text-white" />
        )}
      </div>

      <div className="flex flex-col gap-[17px]">
        <div className="flex flex-col gap-[5px]">
          <span className="bold-body">업체 이미지 등록</span>
          <span className="medium-caption">
            업체를 상징하는 대표 이미지를 등록해주세요.
          </span>
        </div>

        {/* buttons */}
        {url && isNotNullish(logoImageId) ? (
          <div className="flex items-center gap-[6px]">
            <Button
              type="button"
              onClick={openFilePicker}
              className="button-size-sm w-[95px]"
            >
              사진 재등록
            </Button>
            <Button
              type="button"
              onClick={deleteLogoImage}
              className="button-size-sm w-[78px]"
            >
              사진 삭제
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            onClick={openFilePicker}
            className="button-size-sm w-[95px]"
          >
            사진 첨부
          </Button>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default LogoImage;
