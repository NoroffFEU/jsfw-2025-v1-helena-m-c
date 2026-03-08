import { fetchProductById } from "@/lib/api";
import AddToCartButton from "@/components/AddToCartButton";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { id } = await params;

  const product = await fetchProductById(id);

  const hasDiscount = product.discountedPrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.price - product.discountedPrice) / product.price) * 100
      )
    : 0;

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <img
            src={product.image?.url || ""}
            alt={product.image?.alt || product.title}
            className="w-full rounded-lg object-cover"
          />
        </div>

        <div className="flex flex-col gap-6">
          <h1 className="text-3xl font-semibold tracking-tight text-[#2f261f]">
            {product.title}
          </h1>

          <p className="text-[#6f6258] leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center gap-4">
            {hasDiscount ? (
              <>
                <span className="text-xl font-medium text-[#8d7f73] line-through">
                  {product.price} kr
                </span>
                <span className="text-2xl font-semibold text-[#2f261f]">
                  {product.discountedPrice} kr
                </span>
                <span className="text-sm text-[#7c5c46] font-medium">
                  −{discountPercent}%
                </span>
              </>
            ) : (
              <span className="text-2xl font-semibold text-[#2f261f]">
                {product.price} kr
              </span>
            )}
          </div>

          <div className="text-sm text-[#6f6258]">
            Rating: {product.rating}/5
          </div>

          {product.tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-[#f0e7dc] text-[#2f261f] rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          <div className="pt-4">
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>

      {product.reviews?.length ? (
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-6 text-[#2f261f]">
            Customer reviews
          </h2>

          <div className="space-y-6">
            {product.reviews.map((review) => (
              <div key={review.id} className="border-b border-[#e6dbce] pb-4">
                <div className="text-sm font-medium text-[#2f261f]">
                  {review.username}
                </div>
                <div className="text-sm text-[#8d7f73] mb-2">
                  {review.rating}/5
                </div>
                <p className="text-[#6f6258] text-sm">{review.description}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
