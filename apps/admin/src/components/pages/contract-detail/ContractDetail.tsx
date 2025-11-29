import AdminRootLayout from "@/components/layouts/root";
import { useContractDetail } from "./hooks/useContractDetail";
import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { Textarea } from "@repo/ui/textarea";
import { Input } from "@repo/ui/input";
import { BasicOption, Select } from "@repo/ui/select";
import { InfoSection, SectionHeader } from "./components";
import dayjs from "dayjs";
import { cn, formatPhoneNumberKR } from "@repo/utils";
import { Controller, FormProvider } from "react-hook-form";
import Image from "next/image";
import { Spinner } from "@repo/ui/spinner";

const ORIGIN_OPTIONS: BasicOption[] = [
  { value: "국내산", label: "국내산" },
  { value: "수입산", label: "수입산" },
];

const ContractDetailPage = () => {
  const {
    contractDetail,
    formMethods,
    handleSubmit,
    goToList,
    addConstructionPhoto,
    fileInputRef,
    handleFileChange,
    accept,
    multiple,
    isUploading,
    deleteExistingPhoto,
    deleteUploadedPhoto,
    isDirty,
    isEditing,
  } = useContractDetail();
  const {
    control,
    register,
    watch,
    formState: { isValid },
  } = formMethods;
  const uploadedPhotos = watch("uploadedPhotos");
  const deletePhotoIds = watch("deletePhotoIds") || [];

  // 삭제되지 않은 기존 이미지만 필터링
  const visibleConstructionPhotos =
    contractDetail?.constructionPhotos?.filter(
      photo => !deletePhotoIds.includes(photo.imageId)
    ) || [];

  return (
    <AdminRootLayout>
      <FormProvider {...formMethods}>
        <form
          className="flex flex-col gap-[32px] lg:gap-[42px]"
          onSubmit={handleSubmit}
        >
          <div className="flex justify-between items-center">
            <div
              className="flex items-center gap-[7px] medium-body w-fit cursor-pointer"
              onClick={goToList}
            >
              <Icon
                iconName="chevronLeft"
                className="w-4 h-4 text-black stroke-[1.3]"
              />

              <label className="cursor-pointer">목록으로</label>
            </div>

            <Button
              type="submit"
              className="button-size-sm lg:button-size-md w-[76px] lg:w-[122px]"
              variant="outline"
              disabled={!isValid || !isDirty || isEditing}
              isLoading={isEditing}
            >
              저장
            </Button>
          </div>

          {/*  */}
          <div className="flex flex-col w-full gap-[32px] lg:gap-[64px]">
            {/* info */}
            <div className="flex flex-col lg:justify-between  lg:flex-row gap-[32px] lg:gap-[120px] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&_*[data-select-dropdown]]:!overflow-visible">
              {/* 계약정보 */}
              <div className="lg:min-w-[400px] lg:max-w-[400px]">
                <InfoSection
                  title="계약 정보"
                  items={[
                    {
                      field: "계약일",
                      value: dayjs(
                        contractDetail?.contractInfo?.contractDate
                      ).format("YYYY-MM-DD"),
                    },
                    {
                      field: "견적명",
                      value: contractDetail?.quoteInfo?.quoteName,
                    },
                    {
                      field: "설치 방식",
                      value: contractDetail?.quoteInfo?.structureType,
                    },
                    {
                      field: "설치 타입",
                      value: contractDetail?.quoteInfo?.structureType,
                    },
                    {
                      field: "위치",
                      value: `${contractDetail?.quoteInfo?.baseAddress} ${contractDetail?.quoteInfo?.detailAddress}`,
                    },
                    {
                      field: "용량",
                      value: `${contractDetail?.quoteInfo?.plannedCapacity}kw`,
                    },
                    {
                      field: "현재 한전 용량",
                      value: `${contractDetail?.quoteInfo?.currentCapacity}kw`,
                    },
                    {
                      field: "월평균 사용량",
                      value: `${contractDetail?.quoteInfo?.monthlyAverageUsage}kw`,
                    },
                    {
                      field: "기타",
                      value: contractDetail?.quoteInfo?.other,
                    },
                  ]}
                />
              </div>

              {/* 입찰정보 , 고객정보 */}
              <div className="flex flex-col gap-[32px] lg:gap-[64px] lg:min-w-[330px] lg:max-w-[330px]">
                {/* 입찰 정보 */}
                <InfoSection
                  title="입찰 정보"
                  items={[
                    {
                      field: "업체명",
                      value: contractDetail?.bidInfo?.companyName,
                    },
                    {
                      field: "입찰가",
                      value: `${contractDetail?.bidInfo?.bidPrice.toLocaleString(
                        "ko-KR",
                        { currency: "KRW" }
                      )}만원`,
                    },
                    {
                      field: "A/S",
                      value: contractDetail?.bidInfo?.asInfo,
                    },
                    {
                      field: "메시지",
                      value: contractDetail?.bidInfo?.memo,
                    },
                  ]}
                />

                {/* 고객정보 */}
                <InfoSection
                  title="고객 정보"
                  items={[
                    {
                      field: "이름",
                      value: contractDetail?.customerInfo?.name,
                    },
                    {
                      field: "이메일",
                      value: contractDetail?.customerInfo?.email,
                    },
                    {
                      field: "휴대전화 번호",
                      value: formatPhoneNumberKR(
                        contractDetail?.customerInfo?.phone ?? ""
                      ),
                    },
                  ]}
                />
              </div>

              {/* 시공 자재 , 설치 후기 */}
              <div className="flex flex-col gap-[32px] lg:gap-[64px] lg:min-w-[400px] lg:max-w-[400px]">
                {/* 시공 자재 */}
                <InfoSection
                  title="시공 자재"
                  items={[
                    {
                      field: "태양광 모듈",
                      value: (
                        <div className="flex flex-col gap-[10px]">
                          <Input
                            className="w-full input-size-sm"
                            placeholder="태양광 모듈을 입력해 주세요."
                            {...register("solarModule")}
                          />

                          <Controller
                            control={control}
                            name="solarModuleOrigin"
                            render={({ field }) => (
                              <Select
                                type="basic"
                                size="sm"
                                className="w-full rounded-[8px]"
                                labelClassName="bold-caption"
                                placeholder="선택"
                                options={ORIGIN_OPTIONS}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      ),
                    },
                    {
                      field: "인버터",
                      value: (
                        <div className="flex flex-col gap-[10px]">
                          <Input
                            className="w-full input-size-sm"
                            placeholder="인버터를 입력해 주세요."
                            {...register("inverter")}
                          />

                          <Controller
                            control={control}
                            name="inverterOrigin"
                            render={({ field }) => (
                              <Select
                                type="basic"
                                size="sm"
                                className="w-full rounded-[8px]"
                                labelClassName="bold-caption"
                                placeholder="선택"
                                options={ORIGIN_OPTIONS}
                                {...field}
                              />
                            )}
                          />
                        </div>
                      ),
                    },
                    {
                      field: "구조물",
                      value: (
                        <Input
                          className="w-full input-size-sm"
                          placeholder="구조물을 입력해 주세요."
                          {...register("structure")}
                        />
                      ),
                    },
                  ]}
                />

                {/* 설치후기 */}
                <div className="flex flex-col gap-[24px] lg:gap-[40px]">
                  <SectionHeader title="설치 후기" />
                  <Textarea
                    className="h-[126px] lg:h-[200px]"
                    {...register("installationReview")}
                  />
                </div>
              </div>
            </div>

            {/* 시공사진 */}
            <div className="flex flex-col gap-[20px] lg:gap-[50px]">
              <SectionHeader title="시공 사진" />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-y-[20px] gap-x-[10px]">
                {/* 기존 시공 사진 */}
                {visibleConstructionPhotos.map(
                  ({ imageId, contractPhotoId, imageUrl }) => (
                    <div
                      key={`construction-${contractPhotoId}`}
                      className="flex flex-col gap-[10px]"
                    >
                      <div className="relative w-full aspect-[210/115] rounded-[8px] overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt="시공 사진"
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          className="w-fit medium-small text-primary"
                          onClick={() => deleteExistingPhoto(imageId)}
                        >
                          삭제
                        </Button>
                      </div>
                    </div>
                  )
                )}

                {/* 업로드된 새 사진 미리보기 */}
                {uploadedPhotos?.map(({ id, url }) => (
                  <div
                    key={`uploaded-${id}`}
                    className="flex flex-col gap-[10px]"
                  >
                    <div className="relative w-full aspect-[210/115] rounded-[8px] overflow-hidden">
                      <Image
                        src={url}
                        alt="업로드된 시공 사진"
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="button"
                        variant="ghost"
                        className="w-fit medium-small text-primary"
                        onClick={() => deleteUploadedPhoto(id)}
                      >
                        삭제
                      </Button>
                    </div>
                  </div>
                ))}

                <div
                  className={cn(
                    isUploading
                      ? "bg-light-gray cursor-not-allowed"
                      : "bg-white cursor-pointer",
                    "w-full aspect-[210/115] rounded-[8px] overflow-hidden border-1 border-border-color bg-white flex justify-center items-center"
                  )}
                  onClick={addConstructionPhoto}
                >
                  {isUploading ? (
                    <Spinner size="lg" className="text-border-color" />
                  ) : (
                    <Icon
                      iconName="plus"
                      className="w-9 h-9 lg:w-12 lg:h-12 text-border-color"
                    />
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={accept}
                  multiple={multiple}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>
        </form>
      </FormProvider>
    </AdminRootLayout>
  );
};

export default ContractDetailPage;
