import { useModals } from "@repo/hooks";
import { Button } from "@repo/ui/button";
import { FormField } from "@repo/ui/form-field";
import { FormHelper } from "@repo/ui/form-helper";
import { Input } from "@repo/ui/input";
import { Modal } from "@repo/ui/modal";
import DaumPostcodeEmbed, { Address } from "react-daum-postcode";
import { Controller, useFormContext } from "react-hook-form";
import { ApplyPartnerFormData } from "../hooks/useApplyPartnerForm";

const PartnerAddress = () => {
  const { open, close } = useModals();
  const { setValue, control } = useFormContext<ApplyPartnerFormData>();

  const handleAddressSearch = () => {
    open(AddressSerachModal, {
      onComplete: handleComplete,
      closeModal: close,
    });
  };

  const handleComplete = (data: Address) => {
    setValue(
      "baseAddress",
      `${data.address}${data.buildingName && ` (${data.buildingName})`}`
    );
  };

  return (
    <FormField label="업체 주소" required className="mb-[20px] lg:mb-[15px]">
      <div className="flex flex-col gap-[12px] lg:gap-[8px]">
        <Controller
          control={control}
          name="baseAddress"
          render={({ field }) => (
            <div className="flex gap-[10px] lg:gap-[5px] items-center">
              <Input
                className="input-size-md"
                placeholder="주소를 입력해주세요"
                readOnly
                {...field}
              />

              <Button
                className="w-[110px] lg:w-[116px] button-size-lg"
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
                placeholder="상세 주소를 입력해주세요"
                {...field}
              />
            </FormHelper>
          )}
        />
      </div>
    </FormField>
  );
};

interface AddressSearchModalProps {
  onComplete: (data: Address) => void;
  closeModal: () => void;
}

const AddressSerachModal = ({
  onComplete,
  closeModal,
}: AddressSearchModalProps) => {
  const handleComplete = (data: Address) => {
    onComplete(data);
    closeModal();
  };

  return (
    <Modal
      onClose={closeModal}
      modalContainerClassName="min-w-screen min-h-screen lg:min-w-[450px] lg:min-h-0 rounded-none lg:rounded-[20px]"
    >
      <DaumPostcodeEmbed onComplete={handleComplete} />
    </Modal>
  );
};

export default PartnerAddress;
