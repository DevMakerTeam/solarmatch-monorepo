import OrdersPage from "@/components/pages/orders/Orders";
import { ORDER_TYPES } from "@/constants/orders";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Object.values(ORDER_TYPES).map(type => ({
    params: { types: type },
  }));

  return {
    paths,
    fallback: false,
  };
};

// 빌드 시 한 번만 실행
export const getStaticProps: GetStaticProps = async context => {
  const { types } = context.params as { types: string };

  return {
    props: { type: types },
  };
};

export default OrdersPage;
