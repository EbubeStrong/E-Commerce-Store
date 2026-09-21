import Container from "@/components/Layouts/container";
import HomeBanner from "@/components/Pages/Home/homeBanner";
import ProductGrid from "@/components/Products/productGrid";

export default function Home() {
  return (
    <Container className="">
      <HomeBanner />

      <div className="py-10">
      <ProductGrid />
      </div>
    </Container>
  );
}
