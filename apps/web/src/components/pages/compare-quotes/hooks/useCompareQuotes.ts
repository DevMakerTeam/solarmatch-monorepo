import { useRouter } from "next/router";
import { useCompareQuotesForm } from "./useCompareQuotesForm";
import {
  isNotNullish,
  SOLAR_INSTALLATION_TYPES,
  SOLAR_STRUCTURE_TYPES,
} from "@repo/types";

export const useCompareQuotes = () => {
  const router = useRouter();
  const { structureType, installationType, plannedCapacity } = router.query;
  const formMethods = useCompareQuotesForm({
    defaultValues: {
      installationType: isNotNullish(installationType)
        ? (installationType as string)
        : SOLAR_INSTALLATION_TYPES.ROOF,
      structureType: isNotNullish(structureType)
        ? (structureType as string)
        : (SOLAR_STRUCTURE_TYPES.RESIDENTIAL_SOLAR as string),
      baseAddress: "",
      detailAddress: "",
      currentCapacity: undefined,
      plannedCapacity: isNotNullish(plannedCapacity)
        ? Number(plannedCapacity)
        : undefined,
      monthlyAverageUsage: undefined,
    },
  });

  const handleSubmit = formMethods.handleSubmit(data => {
    // bidding/residential-solar로 이동
    console.log(data);
  });

  return { formMethods, handleSubmit };
};
