import { isNotNullish, Parameter, UseQueryParams } from "@repo/types";
import imageApi from "./ImageApi";
import { useQuery } from "@tanstack/react-query";

export const IMAGE_API_QUERY_KEY = {
  GET_IMAGE_URL: (params?: Parameter<typeof imageApi.getImageUrl>) =>
    ["get-image-url", params].filter(isNotNullish),
};

export const useGetImageUrlQuery = (
  params: UseQueryParams<typeof imageApi.getImageUrl>
) => {
  const queryKey = IMAGE_API_QUERY_KEY.GET_IMAGE_URL(params.variables);
  return useQuery({
    queryKey,
    queryFn: () => imageApi.getImageUrl(params.variables),
    ...params?.options,
  });
};
