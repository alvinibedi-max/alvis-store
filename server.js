import { createRequestHandler } from '@shopify/hydrogen';
import { fileURLToPath } from 'node:url';
import * as remNode from '@remix-run/node';
import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

app.all('*', createRequestHandler({
  build: () => import('./build/server/index.js'),
  mode: process.env.NODE_ENV,
}));

app.listen(port, () => {
  console.log(`\n🚀 Storefront preview is live at: http://localhost:${port}\n`);
});
