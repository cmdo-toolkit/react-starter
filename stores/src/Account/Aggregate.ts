export type Account = {
  accountId: string;
  status: Status;
  email: string;
  token: string;
};

export type Status = "onboarding" | "active" | "closed";
