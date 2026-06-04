import Link from "next/link";
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
    <main className="min-h-screen bg-[#F7F3EE] text-[#2F2926]">
      <section className="mx-auto max-w-7xl px-6 py-10 sm:py-16">
        <Link
          href="/"
          className="mb-8 inline-flex text-sm font-bold text-[#C96D4A] hover:text-[#A75538]"
        >
          ← Back to shop
        </Link>

        <div className="grid gap-10 rounded-[2rem] border border-[#E4D7CC] bg-[#FFFDF8] p-5 shadow-sm lg:grid-cols-2 lg:p-8">
          <div className="overflow-hidden rounded-[1.5rem] bg-[#F5EEE8]">
            <img
              src={product.image?.url || ""}
              alt={product.image?.alt || product.title}
              className="h-full min-h-[420px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-2 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C96D4A]">
              Little pick
            </p>

            <h1 className="mt-4 font-serif-display text-5xl leading-tight tracking-tight">
              {product.title}
            </h1>

            <p className="mt-5 text-base leading-8 text-[#756B63]">
              {product.description}
            </p>

            <div className="mt-7 rounded-[1.5rem] bg-[#E9EFE6] p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-3xl font-black">
                  ${product.discountedPrice}
                </span>

                {hasDiscount && (
                  <>
                    <span className="text-lg text-[#756B63] line-through">
                      ${product.price}
                    </span>
                    <span className="rounded-full bg-[#6F7B6A] px-3 py-1 text-xs font-bold text-white">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>

              <p className="mt-3 text-sm font-bold text-[#6F7B6A]">
                Rating: {product.rating}/5
              </p>
            </div>

            {product.tags?.length ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[#E4D7CC] bg-white px-3 py-1 text-xs font-bold text-[#756B63]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-8 [&_button]:w-full [&_button]:rounded-full [&_button]:bg-[#C96D4A] [&_button]:px-5 [&_button]:py-3 [&_button]:font-bold [&_button]:text-white [&_button]:transition [&_button:hover]:bg-[#A75538]">
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        {product.reviews?.length ? (
          <section className="mt-12 rounded-[2rem] border border-[#E4D7CC] bg-[#FFFDF8] p-6 shadow-sm">
            <h2 className="font-serif-display text-3xl">Customer reviews</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {product.reviews.map((review) => (
                <article
                  key={review.id}
                  className="rounded-[1.5rem] bg-[#F5EEE8] p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold">{review.username}</h3>
                    <span className="text-sm font-bold text-[#6F7B6A]">
                      {review.rating}/5
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-[#756B63]">
                    {review.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
