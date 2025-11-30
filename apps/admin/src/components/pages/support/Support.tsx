import AdminRootLayout from "@/components/layouts/root";
import { Accordion } from "@repo/ui/accordion";
import { Button } from "@repo/ui/button";
import { Icon } from "@repo/ui/icon";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSupport } from "./hooks/useSupport";
import { Pagination } from "@repo/ui/pagination";
import AdminLoading from "@/components/AdminLoading";

const SupportPage = () => {
  const {
    qnaList,
    totalPages,
    currentPage,
    handlePageChange,
    faqAccordion,
    handleDeleteQna,
    isQnaListLoading,
  } = useSupport();

  if (isQnaListLoading) {
    return <AdminLoading />;
  }

  return (
    <AdminRootLayout>
      <div className="flex w-full justify-between lg:items-center mb-[32px] lg:mb-[50px]">
        <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[13px] lg:items-center">
          <h1 className="bold-heading6 lg:bold-heading5 text-primary">
            고객센터 관리
          </h1>

          <div className="flex gap-[13px] items-center">
            {/* <span>(대표번호 02-123-4567)</span> */}

            {/* <Button
              variant="ghost"
              icon={
                <Icon
                  iconName="editPencil"
                  className="w-[20px] h-[20px] text-middle-gray"
                />
              }
            /> */}
          </div>
        </div>

        <Link href="/support/create">
          <Button
            variant="outline"
            className="button-size-sm lg:button-size-md w-[82px] lg:w-[122px]"
          >
            등록
          </Button>
        </Link>
      </div>

      <div className="flex flex-col mb-[40px] gap-[15px] lg:gap-[20px]">
        {qnaList.map(qna => (
          <Accordion
            key={qna.id}
            isOpen={faqAccordion.isOpen(qna.id)}
            onToggle={() => faqAccordion.handleToggle(qna.id)}
            className="border-b border-border-color"
          >
            <Accordion.Trigger className="w-full flex pr-0 lg:pr-[50px] pb-[15px] lg:pb-[20px]">
              <span className="flex items-center gap-1 bold-body">
                <span className="text-[#000DD5] shrink-0">Q.</span>
                <span>{qna.question}</span>
              </span>

              <motion.div
                animate={{
                  rotate: faqAccordion.isOpen(qna.id) ? 180 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ transformOrigin: "center" }}
                className="ml-auto flex items-center shrink-0"
              >
                <Icon
                  iconName="chevronDown"
                  className="w-[22px] text-middle-gray"
                />
              </motion.div>
            </Accordion.Trigger>
            <Accordion.Content className="py-[11px] lg:py-[16px] px-[16px] medium-body bg-light-gray border-t border-border-color flex gap-[10px] justify-between items-end">
              <p className="whitespace-pre-line max-w-[500px]">{qna.answer}</p>

              <div className="flex items-center gap-[10px]">
                <Link
                  href={`/support/edit/${qna.id}`}
                  className="w-[22px] h-[22px]"
                >
                  <Button
                    variant="ghost"
                    icon={
                      <Icon
                        iconName="editPencil"
                        className="w-full h-fulltext-primary"
                      />
                    }
                  />
                </Link>

                <Button
                  variant="ghost"
                  icon={
                    <Icon
                      iconName="trash"
                      className="w-[24px] h-[24px] text-primary"
                    />
                  }
                  onClick={() => handleDeleteQna(qna.id)}
                />
              </div>
            </Accordion.Content>
          </Accordion>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={totalPages}
      />
    </AdminRootLayout>
  );
};

export default SupportPage;
