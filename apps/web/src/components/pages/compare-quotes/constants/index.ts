import { RichOption } from "@repo/ui/select";

export const SOLAR_INSTALLATION_TYPES: RichOption[] = [
  {
    title: "지붕형(기본형)",
    description:
      "슬레이트/기와/샌드위치패널/옥상 등 지붕 위 설치 가장 저렴하고 보편적인 방식",
    value: "roof",
  },
  {
    title: "캐노피형",
    description: "주차장, 마당에 캐노피(차양) 겸용 설치",
    value: "canopy",
  },
  {
    title: "건물일체형",
    description:
      "태양광 기와, 외벽 등 건축 자재와 일체형 미관/디자인 중시, 고급 주택용",
    value: "building",
  },
  {
    title: "디자인형",
    description: "정자, 파고라, 조경 시설과 결합. 전원주택, 고급 주택 맞춤형",
    value: "design",
  },
  {
    title: "소형·발코니형",
    description:
      "아파트/빌라 발코니, 베란다 설치. 소규모 발전, 임대주택/도심형 적합",
    value: "small",
  },
];
