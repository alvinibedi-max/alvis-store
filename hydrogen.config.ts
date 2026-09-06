import {defineConfig} from '@shopify/hydrogen';

export default defineConfig({
  dev: {
    port: 8080,
    headless: true,
  },
  shopify: {
    storeDomain: process.env.SHOPIFY_STORE_DOMAIN || 'alvis-store.myshopify.com',
    storefrontToken: process.env.SHOPIFY_STOREFRONT_API_TOKEN || '',
    apiVersion: '2024-10',
  },
});
