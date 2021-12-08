export type Account = {
  id: string;
  status: Status;
  alias: string;
  name: Name;
  email: string;
  token: string;
};

export type Status = "onboarding" | "active" | "closed";

export type Name = {
  family: string;
  given: string;
};
