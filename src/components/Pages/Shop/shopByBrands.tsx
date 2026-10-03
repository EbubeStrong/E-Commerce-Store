"use client";

import Title from "@/components/ui/title";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import type { Brand } from "@/sanity.types";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useLayoutEffect, useRef } from "react";

const extraData = [
  {
    title: "Free Delivery",
    description: "Free shipping over $100",
    icon: <Truck size={45} />,
  },
  {
    title: "Free Return",
    description: "Free shipping over $100",
    icon: <GitCompareArrows size={45} />,
  },
  {
    title: "Customer Support",
    description: "Friendly 27/7 customer support",
    icon: <Headset size={45} />,
  },
  {
    title: "Money Back guarantee",
    description: "Quality checked by our team",
    icon: <ShieldCheck size={45} />,
  },
];

const NUM_COPIES = 4;
const IDLE_SPEED = 40;

const wrap = (min: number, max: number, value: number) => {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
};

const BrandLink = ({ brand }: { brand: Brand }) => (
  <Link
    href={{ pathname: "/shop", query: { brand: brand?.slug?.current } }}
    className="bg-white w-34 h-24 flex items-center justify-center rounded-md overflow-hidden hover:shadow-lg shadow-shop-dark-green/20 hoverEffect shrink-0"
  >
    {brand?.image && (
      <Image
        src={urlFor(brand?.image).url()}
        alt="brandImage"
        width={250}
        height={250}
        className="w-32 h-20 object-contain"
      />
    )}
  </Link>
);

const ShopByBrands = ({ brands }: { brands: Brand[] }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const copyWidth = useRef(0);
  const hovering = useRef(false);
  const reduceMotion = useReducedMotion();

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) =>
    copyWidth.current ? wrap(-copyWidth.current, 0, v) : 0
  );

  useLayoutEffect(() => {
    copyWidth.current = (trackRef.current?.scrollWidth ?? 0) / NUM_COPIES;
  }, [brands]);

  useAnimationFrame((_, timeDelta) => {
    if (hovering.current || reduceMotion) return;
    baseX.set(baseX.get() - (IDLE_SPEED * timeDelta) / 1000);
  });

  return (
    <>
      <div className="bg-shop-light-pink/20 p-5 lg:p-7 rounded-md">
        <div className="flex items-center gap-5 justify-between mb-10">
          <Title>Shop By Brands</Title>
          <Link
            href={"/shop"}
            className="text-sm font-semibold tracking-wide hover:text-white hover:bg-black/80 rounded p-2 hoverEffect"
          >
            View all
          </Link>
        </div>
        <div
          onPointerEnter={() => (hovering.current = true)}
          onPointerLeave={() => (hovering.current = false)}
          className="overflow-hidden"
        >
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max items-center gap-2.5"
          >
            {Array.from({ length: NUM_COPIES }, (_, copy) => (
              <div
                key={copy}
                aria-hidden={copy > 0}
                className="flex items-center gap-2.5 min-w-[33.4vw] justify-center"
              >
                {brands?.map((brand) => (
                  <BrandLink key={brand?._id} brand={brand} />
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 mb-10 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 hover:shadow-shop-light-green/20 py-5">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-lightColor hover:text-shop-light-green shadow-md p-2"
          >
            <span className="inline-flex scale-100 group-hover:scale-90 hoverEffect">
              {item?.icon}
            </span>
            <div className="text-sm">
              <p className="text-darkColor/80 font-bold capitalize">
                {item?.title}
              </p>
              <p className="text-lightColor">{item?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShopByBrands;