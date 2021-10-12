import * as faker from "faker";
import React from "react";
import { stores } from "shared";

import { useQuery } from "../../Hooks/UseQuery";
import { Module } from "../Template/Module";
import { ModuleTitle } from "../Template/ModuleTitle";

export function Users() {
  const users = useQuery("users", { sort: { name: 1 } });
  return (
    <Module>
      <ModuleTitle text="Users" />
      {users.map(({ id, name, email }) => (
        <div key={id} style={{ marginBottom: 20 }}>
          <div>{id}</div>
          <div>{name}</div>
          <div>{email}</div>
          <button
            onClick={() => {
              stores.user.remove({ id });
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              stores.user.setName({ id, name: faker.name.firstName() });
            }}
          >
            Change Name
          </button>
          <button
            onClick={() => {
              stores.user.setEmail({ id, email: faker.internet.email() });
            }}
          >
            Change Email
          </button>
        </div>
      ))}
    </Module>
  );
}
