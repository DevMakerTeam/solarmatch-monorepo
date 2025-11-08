import BiddingContractPage from "@/components/pages/bidding-contract";
import { SOLAR_STRUCTURE_TYPES, SolarStructureType } from "@repo/constants";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async context => {
  const { type, id } = context.params as { type: string; id: string };

  const isValidType = Object.values(SOLAR_STRUCTURE_TYPES).includes(
    type as SolarStructureType
  );

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

export default BiddingContractPage;
