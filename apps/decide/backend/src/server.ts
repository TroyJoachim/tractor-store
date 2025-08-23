import path from "path";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { productPageData } from "./service";

dotenv.config({ path: "../.env" });

const app = express();

// CORS middleware for cross-origin requests (required for module federation)
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
app.get("/api/product", (req: Request, res: Response) => {
  const id = req.query.id as string;
  const sku = req.query.sku as string | undefined;
  
  try {
    const data = productPageData(id, sku);
    res.json(data);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Decide-backend running on http://localhost:${PORT}/`);
});
