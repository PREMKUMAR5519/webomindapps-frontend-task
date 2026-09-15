"use client";

import { useEffect, useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Filters } from "@/components/Filters";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductModal } from "@/components/ProductModal";
import { Product } from "@/types/product";

export default function HomePage() {
  const { products, loading, error } = useProducts();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState<Product | null>(null);
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    setTime(new Date().toLocaleTimeString());
  }, []);
  const categories = useMemo(() => {
    const unique = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(unique)];
  }, [products]);


  // const visibleProducts = products.filter((product) => {
  //   if (category !== "all") {
  //     return product.category === category;
  //   }
  //   return product.title.includes(search);
  // });

  const query = search.trim().toLowerCase();
  const visibleProducts = products.filter((product) => {
    const matchesCategory =
      category === "all" || product.category === category;

    const matchesSearch = product.title.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Product Explorer</h1>
        <p className="text-sm text-slate-500">
          {time ? `Last updated at ${time}` : " "}
        </p>
      </header>

      <Filters
        search={search}
        category={category}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
      />

      {loading && (
        <p className="mt-8 text-slate-500">Loading products…</p>
      )}
      {!loading && error && (
        <div
          role="alert"
          className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4"
        >
          <h2 className="font-semibold text-red-800">
            Couldn’t load products
          </h2>
          <p className="mt-1 text-sm text-red-700">
            {error} Please try refreshing the page.
          </p>
        </div>
      )}
      {!loading && !error && (
        <ProductGrid products={visibleProducts} onSelect={setSelected} />
      )}

      <ProductModal product={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
