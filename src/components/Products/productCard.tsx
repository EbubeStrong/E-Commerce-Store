import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "@sanity/icons";
import { Flame } from "lucide-react";
import PriceView from "./Price/PriceView";
import Title from "@/components/ui/title";
import ProductSideMenu from "./productSideMenu";
import AddToCartButton from "@/components/Cart/AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="text-sm border rounded-md border-darkBlue/20 group bg-white">
      <div className="relative group overflow-hidden bg-shop-light-bg ">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              alt="productImage"
              width={500}
              height={500}
              priority
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-shop-light-bg duration-500 
              ${product?.stock !== 0 ? "group-hover:scale-105" : "opacity-50"}`}
            />
          </Link>
        )}

        <ProductSideMenu product={product} />

        {product?.status === "sale" ? (
          <p className="absolute top-2 left-2 z-10 text-xs border px-2 rounded-full border-shop-light-green hover:text-shop-dark-green hoverEffect">
            Sale!
          </p>
        ) : (
          <Link
            href={"/deal"}
            className="absolute top-2 left-2 z-10 border border-shop-orange/50 p-1 rounded-full group-hover:border-shop-orange hover:text-shop-dark-green hoverEffect"
          >
            <Flame
              size={18}
              fill="#fb6c08"
              className="text-shop-orange/50 group-hover:text-shop-orange hoverEffect"
            />
          </Link>
        )}
      </div>

      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs font-medium text-shop-light-text">
            {product.categories.map((category) => category).join(", ")}
          </p>
        )}

        <Title className="text-sm line-clamp-1">{product?.name}</Title>

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                className={
                  index < 4 ? "text-shop-light-green" : "text-shop-lighter-text"
                }
                fill={index < 4 ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-shop-light-text text-xs tracking-wide">5 Reviews</p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="font-medium">In Stock</p>
          <p
            className={`${product?.stock === 0 ? "text-red-600" : "text-shop-dark-green/80 font-semibold"}`}
          >
            {(product?.stock as number) > 0 ? product?.stock : "unavailable"}
          </p>
        </div>

        <PriceView
          price={product?.price}
          discount={product?.discount}
          className="text-sm"
        />
        <AddToCartButton product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;
