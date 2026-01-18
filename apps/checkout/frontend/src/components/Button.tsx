import { navigate } from "@tractor-store/shared";
import React from "react";
import css from "./Button.module.css";

interface Props {
  href?: string;
  type?: "button" | "submit" | "reset";
  value?: string;
  disabled?: boolean;
  rounded?: boolean;
  extraClass?: string;
  children?: React.ReactNode;
  dataId?: string;
  size?: "normal" | "small";
  variant?: "primary" | "secondary";
  title?: string;
  onClick?: () => void;
}

const Button = ({
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
  onClick,
  ...rest
}: Props) => {
  const Tag = href ? "a" : "button";
  const classes = [
    css.root,
    css[variant],
    extraClass,
    rounded ? css.rounded : "",
    css[size],
  ].join(" ");

  const props: any = {
    className: classes,
    "data-id": dataId,
    title,
    onClick: href
      ? (e: React.MouseEvent<HTMLAnchorElement>) => navigate(href, e)
      : onClick,
    ...rest,
  };

  if (href) {
    props.href = href;
  } else {
    props.disabled = disabled;
    props.type = type;
    props.value = value;
  }

  return (
    <Tag {...props}>
      <div className={css.inner}>{children}</div>
    </Tag>
  );
};

export default Button;
