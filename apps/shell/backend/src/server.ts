import express from 'express';
import cors from 'cors';
import path from 'path';

async function bootstrap() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // serve the built frontend static assets
  const frontendRoot = path.resolve(process.cwd(), '../dist/public');
  app.use('/', express.static(frontendRoot));

  // Handle client-side routing - serve index.html for all non-API routes
  app.get('/*splat', (req, res) => {
    res.sendFile(path.join(frontendRoot, 'index.html'));
  });

  // Start server
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Shell-backend is running on http://localhost:${PORT}`);
  });
}

bootstrap();
