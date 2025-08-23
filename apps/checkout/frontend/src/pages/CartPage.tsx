import { fmtprice } from "../utils";
import Button from "../components/Button";
import LineItem from "../components/LineItem";
import ExploreRecommendations from "explore/explore-recommendations";

interface LineItemData {
  sku: string;
  id: string;
  name: string;
  quantity: number;
  total: number;
  image: string;
}

interface CartPageProps {
  lineItems?: LineItemData[];
  total?: number;
  skus?: string[];
  handleDelete?: (sku: string) => void;
}

export const CartPage = ({
  lineItems = [],
  total = 0,
  skus = [],
  handleDelete = () => { },
}: CartPageProps) => {
  return (
    <div className="ch_CartPage" data-boundary="checkout">
      <h2>Shopping Cart</h2>
      <ul className="ch_CartPage__lineItems">
        {lineItems.map((l) => (
          <LineItem key={l.sku} {...l} handleDelete={handleDelete} />
        ))}
      </ul>
      <hr />
      <p className="ch_CartPage__total">Total: {fmtprice(total)}</p>
      <div className="ch_CartPage__buttons">
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
