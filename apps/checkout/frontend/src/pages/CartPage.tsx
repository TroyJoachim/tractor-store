import { fmtprice } from "../utils";
import Button from "../components/Button";
import { LineItem } from "../components/LineItem";
import ExploreRecommendations from "explore/explore-recommendations";
import css from "./CartPage.module.css";

interface LineItemData {
  sku: string;
  id: string;
  name: string;
  quantity: number;
  total: number;
  image: string;
}

interface Props {
  lineItems?: LineItemData[];
  total?: number;
  skus?: string[];
  handleDelete?: (sku: string) => void;
}

export const CartPage = ({
  lineItems = [],
  total = 0,
  skus = [],
  handleDelete = () => {},
}: Props) => {
  return (
    <div className={css.root} data-boundary="checkout">
      <h2>Shopping Cart</h2>
      <ul className={css.lineItems}>
        {lineItems.map((l) => (
          <LineItem key={l.sku} {...l} handleDelete={handleDelete} />
        ))}
      </ul>
      <hr />
      <p className={css.total}>Total: {fmtprice(total)}</p>
      <div className={css.buttons}>
        <Button href="/checkout/checkout" variant="primary">
          Checkout
        </Button>
        <Button href="/" variant="secondary">
          Continue Shopping
        </Button>
      </div>
      <ExploreRecommendations skus={skus.join(",")} />
    </div>
  );
};
