import { yupResolver } from "@hookform/resolvers/yup";
import { HELPER_TEXT } from "@repo/constants";
import { Resolver, useForm } from "react-hook-form";
import * as yup from "yup";

export const requestBidFormSchema = yup.object().shape({
  solarModule: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  solarModuleOrigin: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  inverter: yup.string().required(HELPER_TEXT.REQUIRED_INPUT),
  inverterOrigin: yup.string().required(),
  structure: yup.string().optional(),
  asInfo: yup.string().optional(),
  memo: yup.string().optional(),
  bidPrice: yup.number().required(HELPER_TEXT.REQUIRED_INPUT),
});

export type RequestBidFormType = yup.InferType<typeof requestBidFormSchema>;

export const useRequestBidForm = () => {
  return useForm<RequestBidFormType>({
    resolver: yupResolver(
      requestBidFormSchema
    ) as unknown as Resolver<RequestBidFormType>,
    mode: "onChange",
    defaultValues: {
      solarModule: "",
      solarModuleOrigin: "국내산",
      inverter: "",
      inverterOrigin: "국내산",
      structure: "",
      asInfo: "",
      memo: "",
      bidPrice: undefined,
    },
  });
};
