import data from "./database";
import { ProductPageData } from "./types";

/**
 * Product Page
 */
export function productPageData(id: string, sku?: string): ProductPageData {
  const product = data.products.find((p: any) => p.id === id);
  
  if (!product) {
    throw new Error(`Product not found: ${id}`);
  }

  const { name, variants, highlights = [] } = product;
  const variant = sku 
    ? variants.find((v: any) => v.sku === sku) || variants[0]
    : variants[0];
    
  return { id, name, variant, variants, highlights };
}
