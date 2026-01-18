import { Navigate } from "@tractor-store/shared";
import React from "react";
import css from "./VariantOption.module.css";

interface Props {
  id: string;
  sku: string;
  name: string;
  selected: boolean;
  color: string;
}

const VariantOption = ({ id, sku, name, selected, color }: Props) => {
  const link = selected ? null : `/product/${id}?sku=${sku}`;
  return (
    <li
      className={css.root}
      style={{ "--variant-color": color } as React.CSSProperties}
    >
      <i className={css.color}></i>
      {link ? <Navigate path={link}>{name}</Navigate> : <strong>{name}</strong>}
    </li>
  );
};

export default VariantOption;
