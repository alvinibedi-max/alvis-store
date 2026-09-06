import { useLoaderData } from '@remix-run/react';
import { json, type LoaderFunctionArgs } from '@remix-run/node';

// 1. THE BACKEND LOADER: Fetches your inventory data before drawing the page
export async function loader({ context }: LoaderFunctionArgs) {
  // Simple test query fetching the first 6 items from your Shopify Catalog
  const homepageQuery = `#graphql
    query GetProducts {
      products(first: 6) {
        nodes {
          id
          title
          handle
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  `;

  const data = await context.storefront.query(homepageQuery);
  return json({ products: data.products.nodes });
}

// 2. THE FRONTEND THEME: Receives the data and maps it into your Base44 layout
export default function Homepage() {
  // Grab the real product list from our loader up above
  const { products } = useLoaderData<typeof loader>();

  return (
    <div className="storefront-wrapper bg-gray-50 min-h-screen">
      {/* Visual Header Navigation */}
      <header className="p-6 bg-white shadow-sm flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Alvis Store</h1>
        <nav className="space-x-4 text-sm font-medium text-gray-600">
          <a href="/collections/laptops" className="hover:text-black">Laptops</a>
          <a href="/collections/phones" className="hover:text-black">Phones</a>
          <a href="/collections/vr" className="hover:text-black">VR Headsets</a>
        </nav>
      </header>

      {/* Main Visual Catalog Layout Grid */}
      <main className="max-w-7xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">Featured Technology</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                {product.featuredImage && (
                  <img 
                    src={product.featuredImage.url} 
                    alt={product.featuredImage.altText || product.title} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-1">{product.title}</h3>
              <p className="text-emerald-600 font-bold">
                ¥{parseFloat(product.priceRange.minVariantPrice.amount).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}