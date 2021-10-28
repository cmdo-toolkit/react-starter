import React from "react";

import { config } from "../../../Config";
import { Link } from "../../Common/Link";
import s from "./Sidebar.module.scss";

export function Sidebar() {
  return (
    <div className={s.container}>
      {config.sidebar.items.map((item) => (
        <Link key={item.id} href={item.href} className={s.link}>
          {item.name}
        </Link>
      ))}
    </div>
  );
}
