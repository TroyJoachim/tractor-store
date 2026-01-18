import React from "react";
import css from "./Button.module.css";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    extraClass?: string;
    rounded?: boolean;
    size?: "normal" | "small" | string;
    variant?: string;
    dataId?: string;
  };

export const Button = ({
  href,
  type,
  value,
  disabled,
  rounded,
  extraClass = "",
  children,
  dataId,
  size = "normal",
  variant = "secondary",
  title,
  ...rest
}: Props) => {
  const Tag: any = href ? "a" : "button";
  return (
    <Tag
      aria-disabled={disabled}
      href={href}
      type={type}
      data-id={dataId}
      title={title}
      className={[
        css.root,
        css[variant],
        extraClass,
        rounded ? css.rounded : "",
        css[size],
      ].join(" ")}
      {...rest}
    >
      <div className={css.inner}>{children}</div>
    </Tag>
  );
};
