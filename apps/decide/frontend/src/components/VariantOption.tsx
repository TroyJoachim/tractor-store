import { Navigate } from "@tractor-store/shared";
import React from "react";

interface VariantOptionProps {
  id: string;
  sku: string;
  name: string;
  selected: boolean;
  color: string;
}

const VariantOption: React.FC<VariantOptionProps> = ({
  id,
  sku,
  name,
  selected,
  color,
}) => {
  const link = selected ? null : `/product/${id}?sku=${sku}`;
  return (
    <li className="de_VariantOption" style={{ "--variant-color": color } as React.CSSProperties}>
      <i className="de_VariantOption__color"></i>
      {link ? <Navigate path={link}>{name}</Navigate> : <strong>{name}</strong>}
    </li>
  );
};

export default VariantOption;
