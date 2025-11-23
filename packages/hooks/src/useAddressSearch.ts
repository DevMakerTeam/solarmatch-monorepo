import {
  FieldPath,
  FieldPathValue,
  FieldValues,
  UseFormSetValue,
} from "react-hook-form";
import { Address } from "react-daum-postcode";
import { useModals } from "./useModals";
import { AddressSearchModal } from "@repo/ui/address-search-modal";

interface UseAddressSearchOptions<T extends FieldValues> {
  setValue: UseFormSetValue<T>;
  baseAddressFieldName: FieldPath<T>;
}

export const useAddressSearch = <T extends FieldValues>({
  setValue,
  baseAddressFieldName,
}: UseAddressSearchOptions<T>) => {
  const { open, close } = useModals();

  const handleAddressSearch = () => {
    open(AddressSearchModal as any, {
      onComplete: handleComplete,
      closeModal: close,
    });
  };

  const handleComplete = (data: Address) => {
    const addressValue = `${data.address}${
      data.buildingName && ` (${data.buildingName})`
    }` as FieldPathValue<T, typeof baseAddressFieldName>;
    setValue(baseAddressFieldName, addressValue);
  };

  return {
    handleAddressSearch,
  };
};
