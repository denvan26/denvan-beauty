import { products } from "@/data/products";
import ProductDetail from "./ProductDetail";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // For static export, we generate metadata at build time
  return params.then(({ slug }) => {
    const product = products.find((p) => p.slug === slug);
    return {
      title: product
        ? `${product.name} | Denvan Beauty`
        : "Product | Denvan Beauty",
      description: product?.description || "Shop premium beauty products at Denvan Beauty.",
    };
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetail slug={slug} />;
}
