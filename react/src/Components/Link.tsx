import React, { CSSProperties, ReactNode } from "react";

import { StyleSheet } from "../Lib/StyleSheet";
import { router } from "../Router";

/*
 |--------------------------------------------------------------------------------
 | Types
 |--------------------------------------------------------------------------------
 */

//#region

type Props = {
  style?: CSSProperties;
  href: string;
  target?: string;
  children: ReactNode;
};

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Component
 |--------------------------------------------------------------------------------
 */

//#region

/**
 * Renders an HTML `a` tag which invokes the router when clicked.
 *
 * This allows simplifies use of the router but also provides the
 * correct standard markup for links.
 *
 * @remarks
 *
 * If a URL is a relative path or if it is of the same host,
 * navigate to the url using the router. If not, then just rely
 * on the default HTML `<a href` behavior to do the navigating.
 */
export function Link({ style = {}, href, target = "_self", children }: Props): JSX.Element {
  return (
    <a
      style={s.link(style)}
      {...hover}
      href={href}
      onClick={(event) => {
        if (isRelative(href)) {
          event.preventDefault();
          router.goTo(href);
        }
      }}
      target={target}
    >
      {children}
    </a>
  );
}

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------------
 */

//#region

export function isRelative(url: string): boolean {
  return url.indexOf("http") !== 0 || window.location.host === url.replace("http://", "").replace("https://", "").split("/")[0];
}

//#endregion

/*
 |--------------------------------------------------------------------------------
 | Styles
 |--------------------------------------------------------------------------------
 */

//#region

const s = StyleSheet.create({
  link: (overrides: CSSProperties) => ({
    color: "#fff",
    textDecoration: "none",
    ...overrides
  })
});

const hover = StyleSheet.hover({
  color: "#ccc"
});

//#endregion
