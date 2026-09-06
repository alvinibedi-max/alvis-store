import {useLoaderData, type LoaderFunctionArgs, useSearchParams} from '@shopify/hydrogen';
import {PRODUCTS, CATEGORIES} from '~/lib/data';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import ProductCard from '~/components/ProductCard';
import ViseChat from '~/components/ViseChat';

export const loader = async () => {
  return {products: PRODUCTS, categories: CATEGORIES};
};

export default function Products() {
  const {products, categories} = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || '';
  const searchFilter = searchParams.get('search') || '';

  const filtered = products.filter(p => {
    if (categoryFilter && p.category !== categoryFilter) return false;
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      if (!p.name.toLowerCase().includes(q) && !p.brand.toLowerCase().includes(q))
        return false;
    }
    return true;
  });

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <h1 className="text-gray-900 font-black text-3xl mb-8">Products</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="md:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 space-y-6 sticky top-24">
              {/* Category Filter */}
              <div>
                <h3 className="text-gray-900 font-bold mb-3 text-sm uppercase tracking-wider">
                  Category
                </h3>
                <div className="space-y-2">
                  <a
                    href="/products"
                    className={`flex items-center gap-2 cursor-pointer text-sm text-gray-700 hover:text-purple-600 transition`}
                  >
                    All Products
                  </a>
                  {categories.map(cat => (
                    <a
                      key={cat.id}
                      href={`/products?category=${cat.id}`}
                      className={`flex items-center justify-between cursor-pointer text-sm text-gray-700 hover:text-purple-600 transition`}
                    >
                      <span>{cat.label}</span>
                      <span className="text-xs text-gray-400 bg-gray-200 rounded-full px-2 py-0.5">
                        {cat.count}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="md:col-span-3">
            <p className="text-gray-600 text-sm mb-6">
              {filtered.length} products found
            </p>

            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-600 text-lg mb-6">No products found</p>
                <a
                  href="/products"
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  Clear filters
                </a>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      <ViseChat />
    </div>
  );
}
