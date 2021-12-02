export type Account = {
  id: string;
  status: Status;
  username: string;
  email: string;
  token: string;
};

export type Status = "onboarding" | "active" | "closed";
