import { USER_FLAGS } from "./Constants";

export type Permissions = {
  user: {
    read: Filters;
  };
};

export type Filters = {
  owner: number;
  friends: number;
  public: number;
};

export type Flags = typeof USER_FLAGS;
