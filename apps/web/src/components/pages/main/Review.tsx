import { cn } from "@repo/utils";
import MotionSection from "./MotionSection";

const REVIEW_DATA = [
  {
    id: 1,
    capacity: "5kW", // 용량
    installationType: "주택 설치", // 설치 유형
    location: "경기 용인", // 지역
    customer: "최○주", // 고객
    content: [
      {
        text: `“처음엔 태양광 견적이 왜 이렇게 다 다른지 이해가 안 됐는데`,
        highlights: [],
      },
      {
        text: "솔라매치에서 업체별 견적을 한눈에 비교해보니 숨겨진 비용이 확실히 보이더라고요.",
        highlights: ["솔라매치에서 업체별 견적"],
      },
      {
        text: `최저가만 고른 게 아니라 자재와 A/S 조건까지 확인할 수 있어서 정말 안심됐습니다.”`,
        highlights: [],
      },
    ],
  },
  {
    id: 2,
    capacity: "3kW",
    installationType: "주택 설치",
    location: "전북 익산",
    customer: "정○진",
    content: [
      {
        text: `“예전에는 시공사가 어떤 모듈을 쓰는지도 몰랐는데,`,
        highlights: [],
      },
      {
        text: "솔라매치에서는 자재 브랜드·모델까지 투명하게 공개해주니 믿을 수 있었습니다.",
        highlights: [],
      },
      {
        text: `공사 완료 후에야 대금이 지급되는 구조라 사기 걱정도 전혀 없었어요.”`,
        highlights: ["공사 완료 후에야 대금이 지급되는 구조라"],
      },
    ],
  },
  {
    id: 3,
    capacity: "3kW",
    installationType: "주택 설치",
    location: "충남 천안",
    customer: "박○민",
    content: [
      {
        text: `“시공사 선택이 가장 고민이었는데, 솔라매치에서 이미 검증된 업체만 연결해주니`,
        highlights: ["검증된 업체만 연결"],
      },
      {
        text: "훨씬 수월했습니다. 견적 비교 덕분에 같은 조건에서 150만원 절감했고,",
        highlights: ["견적 비교 덕분에 같은 조건에서 150만원 절감"],
      },
      {
        text: `계약부터 시공까지 절차도 깔끔했어요.”`,
        highlights: [],
      },
    ],
  },
  {
    id: 4,
    capacity: "6kW",
    installationType: "주택 설치",
    location: "경남 김해",
    customer: "최○석",
    content: [
      {
        text: `“솔라매치를 통해 비교 견적을 받아보니 업체별 차이가 확실히 보였습니다.`,
        highlights: [],
      },
      {
        text: "가격만 본 게 아니라, 사후관리와 보증기간까지 비교할 수 있었던 게 가장 큰 장점입니다.",
        highlights: ["사후관리와 보증기간까지 비교"],
      },
      {
        text: `덕분에 설치 후에도 든든합니다.”`,
        highlights: [],
      },
    ],
  },
  {
    id: 5,
    capacity: "3kW",
    installationType: "주택 설치",
    location: "대구 달서구",
    customer: "이○영",
    content: [
      {
        text: `“처음엔 동네 시공사에서만 견적을 받아봤는데, 솔라매치를 통해 보니`,
        highlights: [],
      },
      {
        text: "같은 용량이라도 가격 차이가 200만 원 이상 나더라고요. 자재 브랜드까지 비교해보고,",
        highlights: ["같은 용량이라도 가격 차이가 200만 원 이상"],
      },
      {
        text: `확실히 납득이 갔습니다. 괜히 발품 안 팔고 바로 여기서 비교하길 잘했어요.”`,
        highlights: [],
      },
    ],
  },
  {
    id: 6,
    capacity: "3kW",
    installationType: "주택 설치",
    location: "충북 청주",
    customer: "박○은",
    content: [
      {
        text: `“예전엔 시공사가 어떤 자재를 쓰는지도 제대로 몰랐는데, 여기서는 모듈·인버터`,
        highlights: ["모듈·인버터"],
      },
      {
        text: "모델명까지 투명하게 공개돼서 좋았습니다. 시공사끼리 견적 차이가 난 이유를",
        highlights: ["모델명까지 투명하게 공개"],
      },
      {
        text: "직접 확인할 수 있었고, 결국 가성비 좋은 선택을 할 수 있었어요.",
        highlights: [],
      },
      {
        text: `무엇보다 추가비용이 전혀 안 나온 게 제일 만족스럽습니다.”`,
        highlights: ["추가비용이 전혀 안 나온 게 제일 만족"],
      },
    ],
  },
  {
    id: 7,
    capacity: "6kW",
    installationType: "주택 설치",
    location: "경남 밀양",
    customer: "이종혁(47세)",
    content: [
      {
        text: `“아버지가 시골집에 태양광을 설치하고 싶어 하셔서 솔라매치를 이용했습니다.`,
        highlights: [],
      },
      {
        text: "최저가만 보여주는 게 아니라, 업체마다 조건과 사후관리까지 비교할 수 있어서",
        highlights: ["업체마다 조건과 사후관리까지 비교"],
      },
      {
        text: "우리 가족이 납득할 수 있었죠.",
        highlights: [],
      },
      {
        text: `지금은 전기요금 절감 덕분에 아버지가 농사 일 하실 때 더 여유가 생기셨습니다.”`,
        highlights: [],
      },
    ],
  },
];

const renderTextWithHighlights = (
  text: string,
  highlights: string[],
  isAnimationComplete: boolean
) => {
  if (!highlights || highlights.length === 0) {
    return text;
  }

  const highlight = highlights[0]; // 첫 번째 하이라이트만 처리
  const parts = text.split(highlight);

  if (parts.length === 1) {
    return text; // 매칭되지 않으면 원본 반환
  }

  return (
    <>
      {parts.map((part, index) => (
        <span key={index}>
          {part}
          {index < parts.length - 1 && (
            <span className={isAnimationComplete ? "highlight-pen" : ""}>
              {highlight}
            </span>
          )}
        </span>
      ))}
    </>
  );
};

export default function Review() {
  return (
    <div className="flex flex-col gap-[40px] w-full mt-[65px] md:mt-[56px] px-[30px] xl:px-0">
      {REVIEW_DATA.map((review, index) => {
        const isRight = (index + 1) % 2 === 0;

        return (
          <MotionSection
            key={review.id}
            className={cn(
              "flex w-full",
              isRight ? "md:justify-end" : "md:justify-start"
            )}
          >
            {isAnimationComplete => (
              <div
                className={cn(
                  "flex flex-col gap-[20px] w-full md:w-[90%] rounded-[12px] bg-[#fafafa]",
                  "px-[17px] md:px-[30px] pb-[15px] md:pb-[24px] pt-[23px]",
                  "shadow-lg"
                )}
              >
                {/* md 이하: 하나의 연결된 텍스트 */}
                <p className="md:hidden medium-body">
                  {review.content.map((item, itemIndex) => (
                    <span key={itemIndex}>
                      {renderTextWithHighlights(
                        item.text,
                        item.highlights,
                        isAnimationComplete
                      )}
                    </span>
                  ))}
                </p>

                {/* md 이상: 각 문장별로 분리 */}
                <div className="hidden md:block medium-body">
                  {review.content.map((item, itemIndex) => (
                    <p key={itemIndex}>
                      {renderTextWithHighlights(
                        item.text,
                        item.highlights,
                        isAnimationComplete
                      )}
                    </p>
                  ))}
                </div>

                {/* 리뷰 정보 */}

                <div className="bold-body text-secondary flex justify-end">
                  {review.capacity} {review.installationType} /{" "}
                  {review.location}
                  {" · "}
                  {review.customer}
                </div>
              </div>
            )}
          </MotionSection>
        );
      })}
    </div>
  );
}
