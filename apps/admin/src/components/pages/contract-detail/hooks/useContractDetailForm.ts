import { yupResolver } from "@hookform/resolvers/yup";
import { Resolver, useForm, UseFormProps } from "react-hook-form";
import * as yup from "yup";

export const contractDetailFormSchema = yup.object().shape({
  solarModule: yup.string().optional(),
  solarModuleOrigin: yup.string().optional(),
  inverter: yup.string().optional(),
  inverterOrigin: yup.string().optional(),
  structure: yup.string().optional(),
  installationReview: yup.string().optional(),
  addPhotoImageIds: yup.array().of(yup.number()).optional(),
  deletePhotoIds: yup.array().of(yup.number()).optional(),
  uploadedPhotos: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().required(),
        url: yup.string().required(),
      })
    )
    .optional(),
});

export type ContractDetailFormType = yup.InferType<
  typeof contractDetailFormSchema
>;

export const useContractDetailForm = (
  options?: UseFormProps<ContractDetailFormType>
) => {
  return useForm<ContractDetailFormType>({
    resolver: yupResolver(
      contractDetailFormSchema
    ) as unknown as Resolver<ContractDetailFormType>,
    mode: "onChange",
    ...options,
  });
};
