"use client";

import Title from "@/components/ui/title";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { GitCompareArrows, Headset, ShieldCheck, Truck } from "lucide-react";
import type { Brand } from "@/sanity.types";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
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

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

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
  const containerRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const halfTrackWidth = useRef(0);
  const directionFactor = useRef(-1);
  const baseVelocity = useRef(0.4);
  const isHovering = useRef(false);
  const coastUntil = useRef(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        halfTrackWidth.current = trackRef.current.scrollWidth / 4;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [brands]);

  useAnimationFrame((_, delta) => {
    const moving =
      !isHovering.current || performance.now() < coastUntil.current;

    if (moving && halfTrackWidth.current > 0) {
      let newX = x.get() + directionFactor.current * baseVelocity.current * delta;
      const limit = halfTrackWidth.current;

      if (newX <= -limit) newX += limit;
      else if (newX > 0) newX -= limit;

      x.set(newX);
    }
  });

  const handlePointerEnter = () => {
    isHovering.current = true;
    baseVelocity.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isHovering.current) return;
    const speed = Math.abs(e.movementX) * 0.05 + 0.4;
    baseVelocity.current = clamp(speed, 0.4, 3);
    directionFactor.current = e.movementX >= 0 ? 1 : -1;
    coastUntil.current = performance.now() + 180;
  };

  const handlePointerLeave = () => {
    isHovering.current = false;
    directionFactor.current = -1;
    baseVelocity.current = 0.4;
  };

  return (
    <div className="mb-10 p-5 lg:p-7 rounded-md">
      <div className="flex items-center gap-5 justify-between mb-10">
        <Title>Shop By Brands</Title>
        <Link
          href={"/shop"}
          className="text-sm font-semibold tracking-wide hover:text-shop-btn-dark-green hoverEffect"
        >
          View all
        </Link>
      </div>
      <div
        ref={containerRef}
        onPointerEnter={handlePointerEnter}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="overflow-hidden"
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-center gap-2.5"
        >
          {[0, 1, 2, 3].map((copy) => (
            <div key={copy} className="flex items-center gap-2.5">
              {brands?.map((brand) => (
                <BrandLink key={brand?._id} brand={brand} />
              ))}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-16 p-2 shadow-sm hover:shadow-shop-light-green/20 py-5">
        {extraData?.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group text-lightColor hover:text-shop-light-green"
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
    </div>
  );
};

export default ShopByBrands;