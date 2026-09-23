"use client";
import { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import ProductCard from "@/components/Products/productCard";
import NoProductAvailable from "@/components/Products/noProductAvailable";
import { Button } from "@/components/ui/button";
// import { getProductsByCategorySlug } from "@/sanity/queries";
import type { ProductWithCategories } from "@/sanity/queries";

interface Props {
  products: ProductWithCategories[];
  categories: Category[];
  currentSlug: string;
}

const CategoryProducts = ({ products, categories, currentSlug }: Props) => {
  const router = useRouter();
  const [activeSlug, setActiveSlug] = useState(currentSlug);

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === activeSlug) return;
    setActiveSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      <div className="flex flex-col md:min-w-40 border">
        {categories?.map((item) => (
          <Button
            onClick={() => handleCategoryChange(item?.slug?.current as string)}
            key={item?._id}
            className={`bg-transparent border-0 p-0 rounded-none text-darkColor shadow-none hover:bg-shop-light-green hover:text-white font-semibold hoverEffect border-b last:border-b-0 transition-colors capitalize ${item?.slug?.current === activeSlug && "bg-shop-light-green text-white border-shop_orange"}`}
          >
            <p className="w-full text-left px-2">{item?.title}</p>
          </Button>
        ))}
      </div>
      <div className="flex-1">
        {products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {products?.map((product: ProductWithCategories) => (
              <AnimatePresence key={product._id}>
                <motion.div>
                  <ProductCard product={product} />
                </motion.div>
              </AnimatePresence>
            ))}
          </div>
        ) : (
          <NoProductAvailable selectedTab={activeSlug} className="mt-0 w-full" />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;