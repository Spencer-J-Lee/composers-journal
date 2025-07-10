import { Fragment, ReactNode } from "react";

export const repeatRender = (
  count: number,
  render: (i: number) => ReactNode,
) => {
  return Array.from({ length: count }, (_, i) => (
    <Fragment key={i}>{render(i)}</Fragment>
  ));
};
