import { SOLAR_STRUCTURE_TYPES } from "@repo/constants";
import { GetServerSideProps } from "next";

// 이 페이지는 렌더링되지 않고 바로 리다이렉트됨
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: `/bidding/${SOLAR_STRUCTURE_TYPES.RESIDENTIAL_SOLAR}`,
      permanent: false, // 302 redirect (임시 리다이렉트)
    },
  };
};

export default function BiddingIndex() {
  return null;
}
