import type { Account } from "../Aggregate";

export const ACCOUNT_FLAGS: Record<keyof Account, number> = {
  accountId: 1 << 0,
  status: 1 << 1,
  email: 1 << 3,
  token: 1 << 4
};
