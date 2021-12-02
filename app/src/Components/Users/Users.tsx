import * as faker from "faker";
import { nanoid } from "nanoid";
import React from "react";
import { stores } from "stores";

import { useQuery } from "../../Hooks/UseQuery";
import { useStream } from "../../Hooks/UseStream";
import type { User as UserInstance } from "../../Models/User";

export function Users() {
  const users = useQuery("users", { sort: { name: 1 } });
  return (
    <div>
      <h1>Users</h1>
      <div>
        <button onClick={create}>Create User</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <User key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function User({ user }: { user: UserInstance }) {
  useStream(user.id);
  return (
    <tr style={{ marginBottom: 20 }}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <button onClick={() => user.remove()}>Delete</button>
        <button onClick={() => user.setName(faker.name.firstName())}>Change Name</button>
        <button onClick={() => user.setEmail(faker.internet.email())}>Change Email</button>
      </td>
    </tr>
  );
}

function create() {
  stores.user.create({ id: nanoid(), name: faker.name.firstName(), email: faker.internet.email() });
}
