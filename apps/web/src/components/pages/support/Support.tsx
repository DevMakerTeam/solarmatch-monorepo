// 고객센터 페이지

import Layout from "@/components/Layout";
import { useAccordion } from "@repo/hooks";
import { Accordion } from "@repo/ui/accordion";
import { Icon } from "@repo/ui/icon";
import { cn } from "@repo/utils";
import { motion } from "framer-motion";
import { faqData } from "./constants";

const SupportPage = () => {
  const faqAccordion = useAccordion<number>(1);

  return (
    <Layout footer={null}>
      <div className="layout-padding-y flex flex-col lg:flex-row gap-[35px] lg:gap-[130px]">
        <h1 className="bold-heading4 lg:bold-heading3 text-center lg:text-left text-nowrap">
          고객센터
        </h1>

        <div className="flex flex-col max-w-[885px] w-full">
          {/* 문의 상담 섹션 */}
          <div className="flex flex-col lg:flex-row gap-[35px] lg:gap-0 lg:justify-between p-[24px] lg:p-[35px] bg-light-primary rounded-[16px] mb-[30px] lg:mb-[80px]">
            <div className="flex lg:flex-col justify-between lg:justify-start lg:gap-[14px]">
              <span className="bold-heading6 lg:bold-heading4 text-primary">
                문의·상담
              </span>

              <p className="whitespace-pre-line regular-body">
                {"평일 09:00 ~ 18:00\n(점심시간 13:00 ~ 14:00)"}
              </p>
            </div>
            <div className="flex lg:flex-col justify-between lg:justify-start lg:gap-[25px]">
              <span className="bold-heading6 lg:bold-heading4 text-primary">
                02-123-4567
              </span>

              <div className="flex items-center lg:justify-center gap-[6px] lg:gap-[10px]">
                <Icon
                  iconName="kakao"
                  className="w-[30px] h-[30px] lg:w-[40px] lg:h-[40px] text-primary"
                />

                <span className="medium-body">실시간 상담하기</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            {faqData.map((faq, i) => {
              return (
                <Accordion
                  key={faq.id}
                  isOpen={faqAccordion.isOpen(faq.id)}
                  onToggle={() => faqAccordion.handleToggle(faq.id)}
                  className="border-b border-border-color"
                >
                  <Accordion.Trigger
                    className={cn(
                      "w-full flex items-center gap-1 text-left",
                      "pb-4 lg:pb-5",
                      i === 0 ? "pt-0" : "pt-4 lg:pt-5"
                    )}
                  >
                    <span className="text-[#000DD5] bold-body shrink-0">
                      Q.
                    </span>
                    <span className="bold-body">{faq.title}</span>
                    <motion.div
                      animate={{
                        rotate: faqAccordion.isOpen(faq.id) ? 180 : 0,
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="ml-auto"
                    >
                      <Icon
                        iconName="chevronDown"
                        className="w-[22px] text-middle-gray"
                      />
                    </motion.div>
                  </Accordion.Trigger>
                  <Accordion.Content className="p-4 medium-body bg-light-gray border-t border-border-color">
                    {faq.content}
                  </Accordion.Content>
                </Accordion>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;
