import * as faker from "faker";
import { nanoid } from "nanoid";
import React, { Fragment } from "react";
import { stores } from "shared";

import { Events } from "../../Components/Events";
import { Users } from "../../Components/Users";
import s from "./Dashboard.module.scss";

export function Dashboard() {
  return (
    <Fragment>
      <div className={s.menu}>
        <button onClick={create}>Create User</button>
      </div>
      <div className={s.container}>
        <Events />
        <Users />
      </div>
    </Fragment>
  );
}

function create() {
  stores.user.create({ id: nanoid(), name: faker.name.firstName(), email: faker.internet.email() });
}
