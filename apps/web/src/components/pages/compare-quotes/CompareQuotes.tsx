// 솔라매치 맞춤 견적받기 페이지

import RootLayout from "@/components/Layout/root";
import { Button } from "@repo/ui/button";
import { FormField } from "@repo/ui/form-field";
import { Input } from "@repo/ui/input";
import { Select } from "@repo/ui/select";
import { Textarea } from "@repo/ui/textarea";
import { SOLAR_INSTALLATION_TYPES } from "./constants";

const CompareQuotesPage = () => {
  return (
    <RootLayout footer={null}>
      <div className="w-full flex flex-col lg:flex-row lg:justify-between layout-padding-y">
        <div className="flex flex-col text-center lg:text-left bold-heading4 lg:bold-heading3 mb-[65px] lg:mb-0">
          <p>솔라매치</p>
          <p>맞춤 견적받기</p>
        </div>

        <form className="flex flex-col w-full lg:max-w-[65%]">
          <FormField label="설치 예정 주소" className="mb-[30px]">
            <div className="flex flex-col gap-[10px] w-full">
              <div className="flex items-center gap-[10px]">
                <Input
                  className="input-size-md"
                  placeholder="주소를 검색해 주세요."
                />

                <Button className="max-w-[100px] lg:max-w-[120px] w-full button-size-lg">
                  주소 검색
                </Button>
              </div>

              <Input
                className="input-size-md"
                placeholder="상세 주소를 입력해 주세요."
              />
            </div>
          </FormField>

          <div className="flex flex-col lg:flex-row w-full gap-[30px] mb-[30px]">
            <FormField label="현재 한전 용량">
              <div className="flex items-center gap-[15px]">
                <Input
                  className="input-size-md"
                  placeholder="용량을 입력해 주세요."
                  type="number"
                />
                <span className="medium-body">kw</span>
              </div>
            </FormField>
            <FormField label="설치 예정 용량">
              <div className="flex items-center gap-[15px]">
                <Input
                  className="input-size-md"
                  placeholder="용량을 입력해 주세요."
                  type="number"
                />
                <span className="medium-body">kw</span>
              </div>
            </FormField>
          </div>

          <FormField label="월평균 사용량" className="mb-[30px]">
            <div className="flex flex-col gap-[8px] lg:gap-[15px]">
              <span className="medium-small">
                ＊ 잘 모르시는 내용은 입력하지 않으셔도 견적 신청이 가능합니다.
              </span>
              <Input
                className="input-size-md"
                placeholder="용량을 입력해 주세요."
                type="number"
              />
            </div>
          </FormField>

          <FormField label="설치 방식 선택" className="mb-[30px]">
            <div className="flex flex-col gap-[14px]">
              <Select
                type="rich"
                value="roof"
                options={SOLAR_INSTALLATION_TYPES}
              />

              <div className="flex flex-col medium-small">
                <p>＊ 슬레이트/기와/샌드위치패널/옥상 등 지붕 위 설치</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;가장 저렴하고 보편적인 방식</p>
              </div>
            </div>
          </FormField>

          <FormField label="기타 요청 사항" className="mb-[30px]">
            <div className="flex flex-col gap-[8px] lg:gap-[20px]">
              <div className="flex flex-col medium-small">
                <p>추가로 원하는 사항이 있으시면 자유롭게 적어주세요.</p>
                <p>{"ex) [건물 형태] 단독/다세대/전원주택"}</p>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[지붕자재]
                  기와/슬레이트/샌드위치/평지붕 등
                </p>
                <p>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;마당에 아래 사진
                  첨부처럼 시공 원합니다 등등
                </p>
              </div>

              <Textarea
                className="h-[130px]"
                placeholder="요청 사항을 입력해 주세요."
              />
            </div>
          </FormField>

          <FormField label="사진 첨부" className="mb-[30px] lg:mb-[60px]">
            <div className="flex flex-col gap-[12px] lg:gap-[20px]">
              <div className="flex max-w-[380px]">
                <span className="shrink-0 medium-small">＊&nbsp;</span>
                <span className="medium-small">
                  본인 건물 사진/전기요금고지서/원하는 형식의 샘플 디자인 등을
                  첨부해주시면 더욱 정확한 경적이 가능합니다.
                </span>
              </div>

              <div className="flex items-center gap-[15px]">
                <Button className="button-size-md w-[116px] lg:w-[130px]">
                  사진 선택
                </Button>
                <span className="medium-body">선택한 사진.jpg</span>
              </div>
            </div>
          </FormField>

          <Button type="submit" className="button-size-lg lg:button-size-xl">
            무료 맞춤 견적 비교받기
          </Button>
        </form>
      </div>
    </RootLayout>
  );
};

export default CompareQuotesPage;
