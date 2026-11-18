import { notFound } from "next/navigation";
import productsData from "@/data/productsData";
import ProductClient from "./ProductClient";

// Static export ke liye required
export async function generateStaticParams() {
  return productsData.map((item) => ({
    slug: item.slug,
  }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = productsData.find(
    (item) => item.slug === slug
  );

  if (!product) {
    return notFound();
  }

  return <ProductClient product={product} />;
}