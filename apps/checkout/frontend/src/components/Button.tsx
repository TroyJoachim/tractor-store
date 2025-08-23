import { navigate } from "@tractor-store/shared";
import React from "react";

interface ButtonProps {
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

const Button: React.FC<ButtonProps> = ({
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
}) => {
  const Tag = href ? "a" : "button";
  const classes = [
    "ch_Button",
    `ch_Button--${variant}`,
    `ch_Button--${size}`,
    rounded ? "ch_Button--rounded" : "",
    extraClass,
  ]
    .filter(Boolean)
    .join(" ");

  const props: any = {
    className: classes,
    "data-id": dataId,
    title,
    onClick: href ? (e: React.MouseEvent<HTMLAnchorElement>) => navigate(href, e) : onClick,
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
      <div className="ch_Button__inner">{children}</div>
    </Tag>
  );
};

export default Button;
