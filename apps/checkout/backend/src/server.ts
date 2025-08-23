import path from "path";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {
  cartPageData,
  addToCartData,
  miniCartData,
  handleAddToCart,
  handleRemoveFromCart,
  handlePlaceOrder,
} from "./service";

dotenv.config({ path: "../.env" });

const app = express();

// CORS middleware for cross-origin requests with credentials
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Middleware
app.use(cookieParser());
app.use(express.json());

// Serve frontend static assets
const frontendRoot = path.resolve(process.cwd(), "../dist/public");
app.use("/", express.static(frontendRoot));

// Request logging
app.use((req, res, next) => {
  if (!req.path.includes("/static/")) {
    console.log(req.method, req.path, req.query);
  }
  next();
});

/**
 * API endpoints
 */
app.get("/api/cart", (req: Request, res: Response) => {
  res.json(cartPageData(req));
});

app.get("/api/addtocart", (req: Request, res: Response) => {
  const sku = req.query.sku as string;
  res.json(addToCartData(sku));
});

app.get("/api/minicart", (req: Request, res: Response) => {
  res.json(miniCartData(req));
});

app.post("/api/cart/item", (req: Request, res: Response) => {
  handleAddToCart(req, res);
  res.json({ success: true });
});

app.delete("/api/cart/item", (req: Request, res: Response) => {
  handleRemoveFromCart(req, res);
  res.json({ success: true });
});

app.post("/api/placeorder", (req: Request, res: Response) => {
  handlePlaceOrder(res);
  res.json({ success: true });
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Checkout-backend running on http://localhost:${PORT}/`);
});
