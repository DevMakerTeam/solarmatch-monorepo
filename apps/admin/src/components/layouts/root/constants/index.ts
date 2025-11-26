import {
  SOLAR_STRUCTURE_TYPE_LABELS,
  SOLAR_STRUCTURE_TYPES,
} from "@repo/types";

export type NavChild = {
  link: string;
  text: string;
};

export type NavItem = {
  link: string;
  text: string;
  links?: NavChild[];
};

export const LINKS: NavItem[] = [
  { link: "/users", text: "회원 관리" },
  {
    link: `/bidding/${SOLAR_STRUCTURE_TYPES.RESIDENTIAL_SOLAR}`,
    text: "견적 관리",
    links: Object.entries(SOLAR_STRUCTURE_TYPE_LABELS).map(([type, label]) => ({
      link: `/bidding/${type}`,
      text: label,
    })),
  },
  { link: "/support", text: "고객센터 관리" },
  { link: "/contracts", text: "계약 관리" },
];
