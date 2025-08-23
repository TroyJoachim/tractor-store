export interface Variant {
  sku: string;
  name: string;
  price: number;
  inventory: number;
  image: string;
  id: string;
}

export interface LineItem extends Variant {
  quantity: number;
  total: number;
}

export interface CartItem {
  sku: string;
  quantity: number;
}

export interface CartPageData {
  lineItems: LineItem[];
  total: number;
  skus: string[];
}

export interface AddToCartData {
  variant: Variant | undefined;
  outOfStock: boolean;
}

export interface MiniCartData {
  quantity: number;
}

export interface Database {
  variants: Variant[];
}
