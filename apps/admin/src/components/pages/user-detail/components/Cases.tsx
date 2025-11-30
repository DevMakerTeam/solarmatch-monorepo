import { ContractCasesModel } from "@repo/types";
import { NonData } from "@repo/ui";
import { Icon } from "@repo/ui/icon";
import { Pagination } from "@repo/ui/pagination";
import { Spinner } from "@repo/ui/spinner";
import Image from "next/image";

interface CasesProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (page: number) => void;
  casesList?: ContractCasesModel["data"];
  isUserDetailFetching: boolean;
  casesTotal?: number;
}

const Cases = ({
  totalPages,
  currentPage,
  handlePageChange,
  casesList,
  isUserDetailFetching,
  casesTotal,
}: CasesProps) => {
  return (
    <div className="flex flex-col gap-[25px] lg:gap-[30px]">
      <div className="flex items-center gap-[15px]">
        <div className="w-[px] border-[2px] border-primary h-[24px] lg:h-[32px]" />

        <h2 className="bold-body lg:bold-heading6 text-primary">시공 사례</h2>
      </div>

      <div className="flex flex-col gap-[24px] lg:gap-[34px] w-full max-w-full lg:max-w-[403px] lg:min-w-[403px]">
        <div className="w-full flex flex-col gap-[15px]">
          {casesTotal ? (
            <>
              {totalPages > 1 && isUserDetailFetching ? (
                <div className="flex items-center justify-center w-full h-[350px]">
                  <Spinner size="lg" />
                </div>
              ) : (
                casesList?.map(
                  ({
                    baseAddress,
                    contractId,
                    detailAddress,
                    plannedCapacity,
                    representativePhotoUrl,
                    title,
                  }) => (
                    <div
                      className="w-full flex gap-[10px] lg:gap-[20px]"
                      key={`${contractId}-${title}`}
                    >
                      {/* 이미지 영역 - 고정 비율 */}
                      <div className="relative w-[135px] aspect-[16/9] flex-shrink-0">
                        <Image
                          src={representativePhotoUrl}
                          alt={title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* 텍스트 영역 */}
                      <div className="flex-1 flex flex-col justify-center">
                        <span className="bold-caption lg:bold-body">
                          {title}
                        </span>

                        <div className="flex items-center mt-[13px]">
                          <Icon
                            iconName="circleLocation"
                            className="w-[15.6px] h-[15.6px] text-middle-gray"
                          />
                          <span className="medium-caption ml-[6px]">
                            <span className="bold-caption">
                              위치&nbsp;&nbsp;
                            </span>
                            <span>{`${baseAddress} ${detailAddress}`}</span>
                          </span>
                        </div>

                        <div className="flex items-center mt-[7px]">
                          <Icon
                            iconName="bolt"
                            className="w-[15.6px] h-[15.6px] text-middle-gray"
                          />
                          <span className="medium-caption ml-[6px]">
                            <span className="bold-caption">
                              용량&nbsp;&nbsp;
                            </span>
                            <span>{plannedCapacity}kw</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                )
              )}
            </>
          ) : (
            <NonData nonDataText="시공 사례가 없습니다." />
          )}
        </div>

        {!!casesTotal && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Cases;
