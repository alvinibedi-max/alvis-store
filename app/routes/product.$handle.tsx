import {useLoaderData, type LoaderFunctionArgs, type ActionFunctionArgs} from '@shopify/hydrogen';
import {PRODUCTS, formatPrice, addToHistory} from '~/lib/data';
import Header from '~/components/Header';
import Footer from '~/components/Footer';
import ProductGallery from '~/components/ProductGallery';
import ProductSpecs from '~/components/ProductSpecs';
import ProductTabs from '~/components/product/ProductTabs';
import FrequentlyBought from '~/components/product/FrequentlyBought';
import AICompare from '~/components/AICompare';
import ReviewsSlider from '~/components/ReviewsSlider';
import {AddToCartButton} from '~/components/AddToCartButton';
import ViseChat from '~/components/ViseChat';
import {Star, Heart, Share2, Check, Truck, Shield} from 'lucide-react';
import {useState, useEffect} from 'react';
import {isWishlisted, toggleWishlist} from '~/lib/data';

export const loader = async ({params}: LoaderFunctionArgs) => {
  const product = PRODUCTS.find(p => p.id === params.handle);
  return {product};
};

export default function ProductDetail() {
  const {product} = useLoaderData<typeof loader>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [selectedStorage, setSelectedStorage] = useState(product?.storage?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    if (product) {
      setWishlisted(isWishlisted(product.id));
      addToHistory(product.id);
    }
  }, [product?.id]);

  if (!product) {
    return (
      <div className="bg-white min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-16 text-center">
          <h1 className="text-gray-900 font-black text-3xl mb-4">
            Product Not Found
          </h1>
          <a
            href="/products"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Back to Products
          </a>
        </main>
        <Footer />
      </div>
    );
  }

  const handleWishlist = () => {
    setWishlisted(toggleWishlist(product.id));
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-purple-600">
              Home
            </a>{' '}
            /{' '}
            <a
              href={`/products?category=${product.category}`}
              className="hover:text-purple-600"
            >
              {product.category}
            </a>{' '}
            /{' '}
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>

          {/* Product Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Image Gallery */}
            <div className="md:col-span-1">
              <ProductGallery
                images={product.images}
                name={product.name}
                discount={discount}
              />
            </div>

            {/* Product Info */}
            <div className="md:col-span-1 space-y-6">
              <div>
                <p className="text-purple-600 font-bold text-xs uppercase tracking-wider mb-2">
                  {product.brand}
                </p>
                <h1 className="text-gray-900 font-black text-2xl mb-3">
                  {product.name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600 text-sm">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-gray-900 font-black text-3xl">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-gray-400 line-through text-lg">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                {product.instalmentMonthly && (
                  <p className="text-gray-600 text-sm">
                    or {product.instalmentMonths} payments of{' '}
                    <span className="font-bold">
                      {formatPrice(product.instalmentMonthly)}
                    </span>{' '}
                    from {product.instalmentRate}
                  </p>
                )}
              </div>

              {/* Options */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <label className="text-gray-900 font-bold text-sm block mb-2">
                    Color
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {product.colors.map(color => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition ${
                          selectedColor === color
                            ? 'border-purple-600 bg-purple-50 text-purple-900'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.storage && product.storage.length > 0 && (
                <div>
                  <label className="text-gray-900 font-bold text-sm block mb-2">
                    Storage
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {product.storage.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedStorage(size)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition ${
                          selectedStorage === size
                            ? 'border-purple-600 bg-purple-50 text-purple-900'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Truck className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900 font-medium">FREE Delivery</p>
                    <p className="text-gray-600">On orders £75+</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-900 font-medium">
                      Protection Plans Available
                    </p>
                    <p className="text-gray-600">
                      From {formatPrice(product.protectionPlan?.price || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buy Box */}
            <div className="md:col-span-1">
              <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 space-y-4 shadow-lg">
                {/* Stock Status */}
                <div className="flex items-center gap-2 text-sm">
                  {product.inStock ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-600 font-medium">
                        In Stock
                      </span>
                    </>
                  ) : (
                    <span className="text-red-600 font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>

                {/* Quantity */}
                <div>
                  <label className="text-gray-900 font-bold text-sm block mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg w-fit">
                    <button
                      onClick={() =>
                        setQuantity(Math.max(1, quantity - 1))
                      }
                      className="px-3 py-2 hover:bg-gray-100 transition"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 text-gray-900 font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-2 hover:bg-gray-100 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Buttons */}
                <AddToCartButton
                  product={product}
                  quantity={quantity}
                  className="w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider"
                />
                <AddToCartButton
                  product={product}
                  quantity={quantity}
                  variant="buy-now"
                  className="w-full py-3"
                />

                {/* Wishlist & Share */}
                <div className="flex gap-2">
                  <button
                    onClick={handleWishlist}
                    className="flex-1 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        wishlisted
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-600'
                      }`}
                    />
                    <span className="text-gray-700 text-sm font-medium">
                      Save
                    </span>
                  </button>
                  <button className="flex-1 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition">
                    <Share2 className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-700 text-sm font-medium">
                      Share
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Tabs */}
          <ProductTabs product={product} />

          {/* Product Specs */}
          <ProductSpecs product={product} />

          {/* AI Compare */}
          <AICompare product={product} />

          {/* Frequently Bought Together */}
          <FrequentlyBought mainProduct={product} />

          {/* Reviews */}
          <ReviewsSlider productName={product.name} />
        </div>
      </main>

      <Footer />
      <ViseChat />
    </div>
  );
}
