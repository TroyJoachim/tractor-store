import { Request, Response } from "express";
import data from "./database";
import {
  CartItem,
  CartPageData,
  AddToCartData,
  MiniCartData,
  LineItem,
} from "./types";

/**
 * Cookie handling
 */
const ITEM_SEP = "|";
const QTY_SEP = "_";
const COOKIE = "c_cart";

export function readFromCookie(req: Request): CartItem[] {
  const cookieStr = req.cookies?.[COOKIE];
  if (!cookieStr) return [];
  return cookieStr.split(ITEM_SEP).map((item: string) => {
    const [sku, quantity] = item.split(QTY_SEP);
    return { sku, quantity: parseInt(quantity, 10) };
  });
}

export function writeToCookie(items: CartItem[], res: Response): void {
  const cookieStr = items
    .map((item) => `${item.sku}${QTY_SEP}${item.quantity}`)
    .join(ITEM_SEP);
  res.cookie(COOKIE, cookieStr, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });
}

function convertToLineItems(items: CartItem[]): LineItem[] {
  return items.reduce<LineItem[]>((res, { sku, quantity }) => {
    const variant = data.variants.find((p: any) => p.sku === sku);
    if (variant) {
      res.push({ ...variant, quantity, total: variant.price * quantity });
    }
    return res;
  }, []);
}

/**
 * Cart Page
 */
export function cartPageData(req: Request): CartPageData {
  const cookieLineItems = readFromCookie(req);
  const lineItems = convertToLineItems(cookieLineItems);
  const total = lineItems.reduce((res, { total }) => res + total, 0);
  const skus = lineItems.map(({ sku }) => sku);
  return { lineItems, total, skus };
}

/**
 * Add to Cart
 */
export function addToCartData(sku: string): AddToCartData {
  const variant = data.variants.find((p: any) => p.sku === sku);
  const outOfStock = variant ? variant.inventory === 0 : true;
  return { variant, outOfStock };
}

/**
 * Mini Cart
 */
export function miniCartData(req: Request): MiniCartData {
  const lineItems = readFromCookie(req);
  const quantity = lineItems.reduce((t, { quantity }) => t + quantity, 0);
  return { quantity };
}

/**
 * Cart Actions
 */
export function handleAddToCart(req: Request, res: Response): void {
  const sku = req.query.sku as string;
  const items = readFromCookie(req);
  const lineItem = items.find((i) => i.sku === sku);
  if (lineItem) {
    lineItem.quantity++;
  } else {
    items.push({ sku, quantity: 1 });
  }
  writeToCookie(items, res);
}

export function handleRemoveFromCart(req: Request, res: Response): void {
  const sku = req.query.sku as string;
  const items = readFromCookie(req);
  const lineItem = items.find((i) => i.sku === sku);
  if (lineItem) {
    const index = items.indexOf(lineItem);
    items.splice(index, 1);
  }
  writeToCookie(items, res);
}

export function handlePlaceOrder(res: Response): void {
  writeToCookie([], res);
}
