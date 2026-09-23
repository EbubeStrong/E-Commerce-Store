import Container from "@/components/Layouts/container";
import Title from "@/components/ui/title";
import CategoryProducts from "@/components/Products/Category/categoryProducts";
import { getCategories, getProductsByCategorySlug } from "@/sanity/queries";
import { notFound } from "next/navigation";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const categories = await getCategories();
  const { slug } = await params;

  const category = categories.find((c) => c.slug?.current === slug);
  if (!category) notFound();

  const products = await getProductsByCategorySlug(slug);

  return (
    <div className="py-10">
      <Container>
        <Title>
          Products by Category:{" "}
          <span className="font-bold text-green-600 capitalize tracking-wide">
            {category?.title}
          </span>
        </Title>
        <CategoryProducts products={products} categories={categories} currentSlug={slug} />
      </Container>
    </div>
  );
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories
    .filter((category) => category.slug?.current)
    .map((category) => ({ slug: category.slug!.current }));
}

export default CategoryPage;