import { Modal, ModalProps } from "@repo/ui/modal";
import { useRequestBidForm } from "../hooks/useRequestBidForm";
import { PropsWithChildren } from "react";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { BasicOption, Select } from "@repo/ui/select";
import { Textarea } from "@repo/ui/textarea";
import { Icon } from "@repo/ui/icon";
import { Controller } from "react-hook-form";
import { FormHelper } from "@repo/ui/form-helper";
import { formatNumberInput } from "@repo/utils";
import { useRequestBidMutation } from "@/api/bid/BidApi.mutation";
import { isNotNullish } from "@repo/types";
import { useQueryClient } from "@tanstack/react-query";
import { QUOTE_API_QUERY_KEY } from "@/api/quote/QuoteApi.query";

const ORIGIN_OPTIONS: BasicOption[] = [
  { value: "국내산", label: "국내산" },
  { value: "수입산", label: "수입산" },
];

interface RequestBidModalProps extends Pick<ModalProps, "onClose"> {
  quoteId?: number;
}

const RequestBidModal = ({ onClose, quoteId }: RequestBidModalProps) => {
  const queryClient = useQueryClient();
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useRequestBidForm();

  // 입찰 요청 (파트너)
  const { mutate: requestBidMutation, isPending: isRequestBidPending } =
    useRequestBidMutation({
      options: {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: QUOTE_API_QUERY_KEY.GET_QUOTE_DETAIL({
              quoteId: Number(quoteId),
            }),
          });
          onClose();
        },
      },
    });
  const onSubmit = handleSubmit(data => {
    if (!isNotNullish(quoteId)) return;

    requestBidMutation({
      quoteId,
      ...data,
    });
  });

  return (
    <Modal
      onClose={onClose}
      modalContainerClassName="rounded-none lg:rounded-[20px]"
      modalContentClassName="min-w-screen lg:min-w-[625px] h-screen lg:h-auto overflow-y-auto px-[35px] lg:px-[40px] pt-[126px] lg:pt-[98px]"
      isCloseButtonVisible={false}
    >
      <Button
        variant="ghost"
        onClick={onClose}
        className="absolute top-[40px] right-[40px] w-[22px] h-[22px] flex items-center justify-center text-black"
      >
        <Icon iconName="x" className="w-[22px] h-[22px]" />
      </Button>

      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-[20px] lg:gap-[16px] mb-[20px] lg:mb-[32px]">
          <Item title="태양광 모듈">
            <div className="flex flex-col lg:flex-row gap-[10px]">
              <Controller
                control={control}
                name="solarModule"
                render={({ field, formState: { errors } }) => (
                  <FormHelper message={{ error: errors.solarModule?.message }}>
                    <Input
                      className="w-full input-size-sm"
                      placeholder="태양광 모듈을 입력해 주세요."
                      {...field}
                    />
                  </FormHelper>
                )}
              />

              <Controller
                control={control}
                name="solarModuleOrigin"
                render={({ field }) => (
                  <Select
                    type="basic"
                    size="sm"
                    className="w-full lg:min-w-[102px] lg:max-w-[102px] rounded-[8px]"
                    labelClassName="bold-caption"
                    placeholder="선택"
                    options={ORIGIN_OPTIONS}
                    {...field}
                  />
                )}
              />
            </div>
          </Item>

          <Item title="인버터">
            <div className="flex flex-col lg:flex-row gap-[10px]">
              <Controller
                control={control}
                name="inverter"
                render={({ field, formState: { errors } }) => (
                  <FormHelper message={{ error: errors.inverter?.message }}>
                    <Input
                      className="w-full input-size-sm"
                      placeholder="인버터를 입력해 주세요."
                      {...field}
                    />
                  </FormHelper>
                )}
              />

              <Controller
                control={control}
                name="inverterOrigin"
                render={({ field }) => (
                  <Select
                    type="basic"
                    size="sm"
                    className="w-full lg:min-w-[102px] lg:max-w-[102px] rounded-[8px]"
                    labelClassName="bold-caption"
                    placeholder="선택"
                    options={ORIGIN_OPTIONS}
                    {...field}
                  />
                )}
              />
            </div>
          </Item>

          <Item title="구조물">
            <Controller
              control={control}
              name="structure"
              render={({ field }) => (
                <Input
                  className="w-full input-size-sm"
                  placeholder="구조물을 입력해 주세요."
                  {...field}
                />
              )}
            />
          </Item>

          <Item title="A/S">
            <Controller
              control={control}
              name="asInfo"
              render={({ field }) => (
                <Textarea
                  className="w-full h-[100px]"
                  placeholder="A/S를 적어주세요."
                  {...field}
                />
              )}
            />
          </Item>

          <Item title="메시지">
            <Controller
              control={control}
              name="memo"
              render={({ field }) => (
                <Textarea
                  className="w-full h-[100px]"
                  placeholder="메시지를 적어주세요."
                  {...field}
                />
              )}
            />
          </Item>
        </div>

        <div className="py-[10px] w-full rounded-[8px] bg-light-gray mb-[55px] lg:mb-[35px] flex items-center justify-center gap-[10px]">
          <span className="bold-body">견적 :</span>

          <Controller
            control={control}
            name="bidPrice"
            render={({ field }) => (
              <Input
                className="input-size-sm w-[132px] bg-white"
                placeholder="금액 입력"
                {...formatNumberInput({
                  ...field,
                  value: field.value ?? "",
                })}
              />
            )}
          />

          <span className="bold-body">만원</span>
        </div>

        <Button
          className="w-[200px] button-size-lg mx-auto"
          type="submit"
          disabled={!isValid}
          isLoading={isRequestBidPending}
        >
          입찰하기
        </Button>
      </form>
    </Modal>
  );
};

export default RequestBidModal;

const Item = ({ title, children }: PropsWithChildren<{ title: string }>) => {
  return (
    <div className="flex flex-col lg:flex-row items-start gap-[20px] lg:gap-[60px] lg:justify-between">
      <div className="max-w-full lg:max-w-[92px] w-full flex items-center gap-[15px]">
        <div className="w-[3px] h-[16px] bg-primary" />

        <p className="bold-body text-nowrap">{title}</p>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
};
