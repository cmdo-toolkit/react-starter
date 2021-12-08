export type Permissions = {
  account: {
    read: Filters;
  };
};

export type Filters = {
  owner: number;
  public: number;
};
