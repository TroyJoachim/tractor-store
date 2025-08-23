import React from "react";
import { src, srcset, fmtprice } from "../utils";
import Button from "./Button";
import { Navigate } from "@tractor-store/shared";

interface LineItemProps {
  sku: string;
  id: string;
  name: string;
  quantity: number;
  total: number;
  image: string;
  handleDelete?: (sku: string) => void;
}

const LineItem: React.FC<LineItemProps> = ({
  sku,
  id,
  name,
  quantity,
  total,
  image,
  handleDelete,
}) => {
  const url = `/product/${id}?sku=${sku}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (handleDelete) {
      await handleDelete(sku);
    }
  };

  return (
    <li className="ch_LineItem">
      <Navigate className="ch_LineItem__image" path={url}>
        <img
          src={src(image, 200)}
          srcSet={srcset(image, [200, 400])}
          sizes="200px"
          alt={name}
          width="200"
          height="200"
        />
      </Navigate>
      <div className="ch_LineItem__details">
        <Navigate className="ch_LineItem__name" path={url}>
          <strong>{name}</strong>
          <br />
          {sku}
        </Navigate>

        <div className="ch_LineItem__quantity">
          <span>{quantity}</span>

          <form
            action="/checkout/cart/remove"
            method="post"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="sku" value={sku} />
            <Button
              variant="secondary"
              rounded
              type="submit"
              value="remove"
              size="small"
              title={`Remove ${name} from cart`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                height="20"
                width="20"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#000"
                  d="m40 5.172-16 16-16-16L5.171 8l16.001 16L5.171 40 8 42.828l16-16 16 16L42.828 40l-16-16 16-16L40 5.172Z"
                />
              </svg>
            </Button>
          </form>
        </div>
        <div className="ch_LineItem__price">{fmtprice(total)}</div>
      </div>
    </li>
  );
};

export default LineItem;
