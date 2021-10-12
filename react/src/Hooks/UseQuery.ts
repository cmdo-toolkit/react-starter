import type { Options } from "cmdo-db";
import { useEffect, useState } from "react";

import { collections } from "../Data/Collections";

/*
 |--------------------------------------------------------------------------------
 | Types
 |--------------------------------------------------------------------------------
 */

//#region

type RecordMap<T> = {
  [P in keyof T]: T[P];
};

type Collections = RecordMap<typeof collections>;

type Model<K extends keyof Collections> = InstanceType<Collections[K]["model"]>;

type Opts = {
  filter?: any;
  sort?: Options["sort"];
  skip?: Options["skip"];
  limit?: Options["limit"];
  observe?: boolean;
  singleton?: boolean;
  args?: any[];
};

type Single = Opts & {
  singleton: true;
};

type Many = Opts & {
  singleton?: false | undefined;
};

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Hooks
 |--------------------------------------------------------------------------------
 */

//#region

export function useQuery<K extends keyof Collections, T extends Model<K>>(key: K, options?: Many): T[];
export function useQuery<K extends keyof Collections, T extends Model<K>>(key: K, options?: Single): T | undefined;
export function useQuery<K extends keyof Collections, T extends Model<K>>(key: K, options: Opts = {}): T[] | T | undefined {
  const [data, setData] = useState<any>();

  const cached = JSON.stringify(options);

  useEffect(() => {
    const { filter, observe = true, singleton = false, args = [], ...options } = JSON.parse(cached) as Opts;
    const collection = collections[key];
    if (singleton === true) {
      if (observe) {
        return collection.observeOne(filter).subscribe(setData).unsubscribe;
      }
      collection.findOne(filter).then(setData);
    } else {
      if (observe) {
        return collection.observe(filter, getQueryOptions(options)).subscribe(setData).unsubscribe;
      }
      collection.find(filter).then(setData);
    }
  }, [key, cached]);

  return data ? data : options.singleton === true ? undefined : [];
}

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

//#region

function getQueryOptions(opts: Opts): Options | undefined {
  const options: Options = {};
  if (opts.sort) {
    options.sort = opts.sort;
  }
  if (opts.skip !== undefined) {
    options.skip = opts.skip;
  }
  if (opts.limit !== undefined) {
    options.limit = opts.limit;
  }
  if (Object.keys(options).length > 0) {
    return options;
  }
}

//#endregion
