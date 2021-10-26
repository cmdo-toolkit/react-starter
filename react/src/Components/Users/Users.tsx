import * as faker from "faker";
import React from "react";

import { useQuery } from "../../Hooks/UseQuery";
import { Module } from "../Template/Module";
import { ModuleTitle } from "../Template/Module";

export function Users() {
  const users = useQuery("users", { sort: { name: 1 } });
  return (
    <Module>
      <ModuleTitle text="Users" />
      {users.map((user) => (
        <div key={user.id} style={{ marginBottom: 20 }}>
          <div>{user.id}</div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <button onClick={() => user.remove()}>Delete</button>
          <button onClick={() => user.setName(faker.name.firstName())}>Change Name</button>
          <button onClick={() => user.setEmail(faker.internet.email())}>Change Email</button>
        </div>
      ))}
    </Module>
  );
}
