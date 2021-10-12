import { CSSProperties } from "react";

type Styles = Record<string, CSSProperties | CSSPropertiesFn>;

type CSSPropertiesFn = (...args: any[]) => CSSProperties;

export const StyleSheet = {
  absoluteFill: Object.freeze<CSSProperties>({
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }),
  create<T extends Styles>(styles: T): T {
    return styles;
  },
  hover(hover: CSSProperties) {
    const source: any = {};
    return {
      onMouseOver(e: any) {
        for (const key in hover) {
          source[key] = e.target.style[key];
          e.target.style[key] = hover[key as keyof CSSProperties];
        }
      },
      onMouseLeave(e: any) {
        for (const key in hover) {
          e.target.style[key] = source[key as keyof CSSProperties];
        }
      }
    };
  }
};
