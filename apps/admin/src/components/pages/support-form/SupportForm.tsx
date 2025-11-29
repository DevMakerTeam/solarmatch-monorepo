import AdminRootLayout from "@/components/layouts/root";
import { Button } from "@repo/ui/button";
import { Input } from "@repo/ui/input";
import { Textarea } from "@repo/ui/textarea";
import { useSupportForm } from "./hooks/useSupportForm";
import { Controller } from "react-hook-form";
import { FormHelper } from "@repo/ui/form-helper";
import AdminLoading from "@/components/AdminLoading";

export const SupportFormPage = () => {
  const {
    control,
    handleCancel,
    handleSubmit,
    isFormValid,
    isLoading,
    isQnaDetailLoading,
  } = useSupportForm();

  if (isQnaDetailLoading) {
    return <AdminLoading />;
  }

  return (
    <AdminRootLayout>
      <div className="flex flex-col lg:flex-row gap-[32px] lg:justify-between">
        <h1 className="text-nowrap bold-heading6 lg:bold-heading5 text-primary w-fit">
          Q&A 등록
        </h1>

        <div className="max-w-[956px] w-full">
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <Controller
              control={control}
              name="question"
              render={({ field, formState: { errors } }) => (
                <FormHelper
                  message={{ error: errors.question?.message }}
                  className="mb-[20px] lg:mb-[35px]"
                >
                  <Input
                    placeholder="제목 입력"
                    className="input-size-sm lg:input-size-lg"
                    {...field}
                  />
                </FormHelper>
              )}
            />

            <Controller
              control={control}
              name="answer"
              render={({ field, formState: { errors } }) => (
                <FormHelper
                  className="mb-[32px] lg:mb-[56px]"
                  message={{ error: errors.answer?.message }}
                >
                  <Textarea
                    placeholder="내용 입력"
                    className="min-h-[450px]"
                    {...field}
                  />
                </FormHelper>
              )}
            />

            <div className="flex items-center gap-[10px] lg:gap-[35px] mx-auto">
              <Button
                variant="outline"
                className="button-size-lg w-[156px]"
                type="button"
                onClick={handleCancel}
              >
                취소
              </Button>

              <Button
                className="button-size-lg w-[156px]"
                type="submit"
                disabled={!isFormValid}
                isLoading={isLoading}
              >
                등록하기
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AdminRootLayout>
  );
};

export default SupportFormPage;
