import React from "react";

import { config } from "../../Config";
import { StyleSheet } from "../../Lib/StyleSheet";
import { Link } from "../Link";

export function Sidebar() {
  return (
    <div style={s.container}>
      {config.sidebar.items.map((item) => (
        <Link key={item.id} href={item.href} style={s.link}>
          {item.name}
        </Link>
      ))}
    </div>
  );
}

const s = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    gridArea: "sidebar"
  },
  link: {
    display: "block",
    padding: "10px 20px"
  }
});
