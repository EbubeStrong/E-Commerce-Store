import Container from "@/components/Layouts/container";
import HomeBanner from "@/components/Pages/Home/homeBanner";
import ProductGrid from "@/components/Products/productGrid";
import HomeCategories from "@/components/Pages/Home/HomeTab/homeCategories";
import { getCategories } from "@/sanity/queries";

export default async function Home() {
  const categories = await getCategories();
  return (
    <Container className="">
      <HomeBanner />

      <ProductGrid />
      <HomeCategories categories={categories} />
    </Container>
  );
}