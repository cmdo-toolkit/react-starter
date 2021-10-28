import type { Options as QueryOptions } from "cmdo-db";

import { collections } from "../Data/Collections";

export type RecordMap<T> = {
  [P in keyof T]: T[P];
};

export type Collections = RecordMap<typeof collections>;

export type Model<K extends keyof Collections> = InstanceType<Collections[K]["model"]>;

export type Options = {
  filter?: any;
  sort?: QueryOptions["sort"];
  skip?: QueryOptions["skip"];
  limit?: QueryOptions["limit"];
  observe?: boolean;
  singleton?: boolean;
};

export type Single = Options & {
  singleton: true;
};

export type Many = Options & {
  singleton?: false | undefined;
};