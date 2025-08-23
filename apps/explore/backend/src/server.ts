import path from "path";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import {
  homePageData,
  categoryPageData,
  storesPageData,
  recommendationsFragmentData,
} from "./service";

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

// serve the built frontend static assets
const frontendRoot = path.resolve(process.cwd(), "../dist/public");
app.use("/", express.static(frontendRoot));

// simple request logging that skips static files
app.use((req: Request, res: Response, next: NextFunction) => {
  if (!req.path.includes("/static/")) {
    console.log(req.method, req.path, JSON.stringify(req.query));
  }
  next();
});

// register API routes
app.get("/api/home", (req: Request, res: Response) => 
  res.json(homePageData())
);

app.get("/api/category", (req: Request, res: Response) =>
  res.json(categoryPageData(req.query.filter as string))
);

app.get("/api/stores", (req: Request, res: Response) => 
  res.json(storesPageData())
);

app.get("/api/recommendations", (req: Request, res: Response) =>
  res.json(recommendationsFragmentData((req.query.skus as string) || ""))
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Explore-backend is running on http://localhost:${PORT}/`));
