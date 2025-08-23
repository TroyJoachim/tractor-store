export interface Variant {
  sku: string;
  name: string;
  color: string;
  image: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  highlights?: string[];
  variants: Variant[];
}

export interface ProductPageData {
  id: string;
  name: string;
  variant: Variant;
  variants: Variant[];
  highlights: string[];
}

export interface Database {
  products: Product[];
}
