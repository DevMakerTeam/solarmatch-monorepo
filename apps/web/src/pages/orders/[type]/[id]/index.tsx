import OrdersDetailPage from "@/components/pages/orders-detail";
import { ORDER_TYPES, OrderType, SOLAR_INSTALLATION_TYPES } from "@/constants";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async context => {
  const { type, id } = context.params as { type: string; id: string };
  const { install, page } = context.query;

  const isValidType = Object.values(ORDER_TYPES).includes(type as OrderType);

  if (!isValidType) {
    return {
      notFound: true,
    };
  }

  // TODO 실 데이터 연동시 api 호출하여 조회가 되면 데이터 props로 전달, 조회가 안되면 notFound 반환
  if (!id) {
    return {
      notFound: true,
    };
  }

  const installValue = (install as string) || SOLAR_INSTALLATION_TYPES[0].value;
  const pageValue = (page as string) || "1";

  // install 유효성 검사
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
      id,
      install: installValue,
      page: pageValue,
    },
  };
};

export default OrdersDetailPage;
