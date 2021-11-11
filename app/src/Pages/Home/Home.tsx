import React from "react";

import { Events } from "../../Components/Events";
import { Users } from "../../Components/Users";
import s from "./Home.module.scss";

export function Home(): JSX.Element | null {
  return (
    <div className={s.container}>
      <Users />
      <Events />
    </div>
  );
}
