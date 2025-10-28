import OrdersPage from "@/components/pages/orders/Orders";
import { ORDER_TYPES } from "@/constants/orders";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.values(ORDER_TYPES).map(type => ({
    params: { type },
  }));

  return {
    paths,
    fallback: false,
  };
};

// 빌드 시 한 번만 실행
export const getStaticProps: GetStaticProps = async context => {
  const { type } = context.params as { type: string };

  return {
    props: { type: type },
  };
};

export default OrdersPage;
