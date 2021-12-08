import type { User } from "../Aggregate";

export const USER_FLAGS: Record<keyof User, number> = {
  accountId: 1 << 0,
  userId: 1 << 1,
  name: 1 << 2,
  email: 1 << 3
};
