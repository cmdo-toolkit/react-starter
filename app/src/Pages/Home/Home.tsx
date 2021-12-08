import React from "react";

import { Avatar } from "../../Components/Auth/Avatar";
import { Events } from "../../Components/Events";
import s from "./Home.module.scss";

export function Home(): JSX.Element | null {
  return (
    <div className={s.container}>
      <Avatar />
      <Events />
    </div>
  );
}
