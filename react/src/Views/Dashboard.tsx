import * as faker from "faker";
import { nanoid } from "nanoid";
import React, { Fragment } from "react";
import { stores } from "shared";

import { Events } from "../Components/Modules/Events";
import { Users } from "../Components/Modules/Users";
import { StyleSheet } from "../Lib/StyleSheet";

export function Dashboard() {
  return (
    <Fragment>
      <div style={s.menu}>
        <button onClick={create}>Create User</button>
      </div>
      <div style={s.container}>
        <Events />
        <Users />
      </div>
    </Fragment>
  );
}

function create() {
  stores.user.create({ id: nanoid(), name: faker.name.firstName(), email: faker.internet.email() });
}

const s = StyleSheet.create({
  container: {
    display: "grid",
    gridTemplateRows: "auto",
    gridTemplateColumns: "1fr 1fr",
    gridRowGap: 20,
    gridColumnGap: 20
  },
  menu: {
    marginBottom: 25
  }
});
