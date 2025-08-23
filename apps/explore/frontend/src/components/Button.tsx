import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href?: string;
    extraClass?: string;
    rounded?: boolean;
    size?: "normal" | "small" | string;
    variant?: string;
    dataId?: string;
  };

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
  ...rest
}) => {
  const Tag: any = href ? "a" : "button";
  return (
    <Tag
      {...(Tag === "button" ? { type } : {})}
      {...rest}
      aria-disabled={disabled}
      href={href}
      data-id={dataId}
      title={title}
      className={[
        "e_Button",
        `e_Button--${variant}`,
        extraClass,
        rounded ? "e_Button--rounded" : "",
        size !== "normal" ? `e_Button--${size}` : "",
      ].join(" ")}
    >
      <div className="e_Button__inner">{children}</div>
    </Tag>
  );
};

export default Button;
