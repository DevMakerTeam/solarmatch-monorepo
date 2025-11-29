import { ApiResponse } from "@repo/types";
import {
  UsersStatsBidsType,
  UsersStatsBidsTypeLabel,
} from "../dto/users-stats-bids-dto";

export type UsersStatsBidsModelData = {
  label: string;
  date: string;
  count: number;
};

export type UsersStatsBidsModel = ApiResponse<{
  type: UsersStatsBidsType;
  typeLabel: UsersStatsBidsTypeLabel;
  startDate: string;
  endDate: string;
  data: UsersStatsBidsModelData[];
  totalCount: number;
}>;
