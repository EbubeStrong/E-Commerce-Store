import Container from "@/components/Layouts/container";
import HomeBanner from "@/components/Pages/Home/homeBanner";
import ProductGrid from "@/components/Products/productGrid";
import HomeCategories from "@/components/Pages/Home/HomeTab/homeCategories";
import { getAllBrands, getCategories } from "@/sanity/queries";
import ShopByBrands from "@/components/Pages/Shop/ShopByBrands";
import BlogPage from "./blog/page";

export default async function Home() {
  const [categories, brands] = await Promise.all([
    getCategories(),
    getAllBrands(),
  ]);
  return (
    <Container className="">
      <HomeBanner />
      <ProductGrid />
      <HomeCategories categories={categories} />
      <ShopByBrands brands={brands} />
      <BlogPage />
    </Container>
  );
}