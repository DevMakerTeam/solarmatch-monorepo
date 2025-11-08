import BiddingPage from "@/components/pages/bidding";
import { ORDER_TYPES, OrderType, SOLAR_INSTALLATION_TYPES } from "@/constants";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async context => {
  const { type } = context.params as { type: string };
  const { install } = context.query;

  // type 유효성 검사
  const isValidType = Object.values(ORDER_TYPES).includes(type as OrderType);
  if (!isValidType) {
    return {
      notFound: true,
    };
  }

  // install이 없으면 기본값을 쿼리 스트링에 추가하여 리다이렉트
  if (!install) {
    return {
      redirect: {
        destination: `/bidding/${type}?install=${SOLAR_INSTALLATION_TYPES[0].value}`,
        permanent: false,
      },
    };
  }

  // install 유효성 검사
  const installValue = install as string;
  const isValidInstall = SOLAR_INSTALLATION_TYPES.some(
    item => item.value === installValue
  );

  if (!isValidInstall) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      type,
      install: installValue,
    },
  };
};

export default BiddingPage;
