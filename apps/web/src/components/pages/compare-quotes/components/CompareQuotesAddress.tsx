import { useAddressSearch } from "@repo/hooks";
import { Button } from "@repo/ui/button";
import { FormField } from "@repo/ui/form-field";
import { Input } from "@repo/ui/input";
import { Controller, useFormContext } from "react-hook-form";
import { CompareQuotesFormType } from "../hooks/useCompareQuotesForm";
import { FormHelper } from "@repo/ui/form-helper";

const CompareQuotesAddress = () => {
  const { setValue, control } = useFormContext<CompareQuotesFormType>();
  const { handleAddressSearch } = useAddressSearch<CompareQuotesFormType>({
    setValue,
    baseAddressFieldName: "baseAddress",
  });

  return (
    <FormField label="설치 예정 주소" className="mb-[30px]" required>
      <div className="flex flex-col gap-[10px] w-full">
        <Controller
          control={control}
          name="baseAddress"
          render={({ field }) => (
            <div className="flex items-center gap-[10px]">
              <Input
                className="input-size-md"
                placeholder="주소를 검색해 주세요."
                readOnly
                {...field}
              />

              <Button
                className="max-w-[100px] lg:max-w-[120px] w-full button-size-lg"
                type="button"
                onClick={handleAddressSearch}
              >
                주소 검색
              </Button>
            </div>
          )}
        />
        <Controller
          control={control}
          name="detailAddress"
          render={({ field, formState: { errors } }) => (
            <FormHelper message={{ error: errors.detailAddress?.message }}>
              <Input
                className="input-size-md"
                placeholder="상세 주소를 입력해 주세요."
                {...field}
              />
            </FormHelper>
          )}
        />
      </div>
    </FormField>
  );
};

export default CompareQuotesAddress;
