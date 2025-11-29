export const USERS_STATS_BIDS_TYPES = {
  DAILY: "일간",
  WEEKLY: "주간",
  MONTHLY: "월간",
} as const;

export type UsersStatsBidsType = keyof typeof USERS_STATS_BIDS_TYPES;
export type UsersStatsBidsTypeLabel =
  (typeof USERS_STATS_BIDS_TYPES)[UsersStatsBidsType];

export type UsersStatsBidsDto = {
  type: UsersStatsBidsType;
  startDate: string;
  endDate: string;
};
