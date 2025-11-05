import OrdersDetailPage from "@/components/pages/orders-detail";
import { ORDER_TYPES, OrderType } from "@/constants";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async context => {
  const { type, id } = context.params as { type: string; id: string };

  const isValidType = Object.values(ORDER_TYPES).includes(type as OrderType);

  if (!isValidType) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      type,
      id,
    },
  };
};

export default OrdersDetailPage;
