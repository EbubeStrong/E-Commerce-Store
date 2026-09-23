import { sanityFetch } from "../lib/live";
import {
  BLOG_CATEGORIES,
  BRAND_QUERY,
  BRANDS_QUERY,
  DEAL_PRODUCTS,
  GET_ALL_BLOG,
  LATEST_BLOG_QUERY,
  MY_ORDERS_QUERY,
  OTHERS_BLOG_QUERY,
  PRODUCT_BY_SLUG_QUERY,
  PRODUCTS_BY_CATEGORY_SLUG,
  SINGLE_BLOG_QUERY,
} from "./query";
import type {
  Blog,
  Blogcategory,
  Brand,
  Category,
  Order,
  Product,
  SanityImageAssetReference,
  SanityImageCrop,
  SanityImageHotspot,
  Slug,
} from "@/sanity.types";

interface BrandNameResult {
  brandName: string;
}

interface BlogWithCategories extends Omit<Blog, "blogcategories"> {
  blogcategories: Array<{ _key: string; title: string }>;
}

interface BlogWithFullCategories extends Omit<Blog, "blogcategories" | "author"> {
  blogcategories: Array<Blogcategory>;
  author?: {
    name?: string;
    image?: {
      asset?: SanityImageAssetReference;
      media?: unknown;
      hotspot?: SanityImageHotspot;
      crop?: SanityImageCrop;
      _type: "image";
    };
  };
}

interface ProductWithCategories extends Omit<Product, "categories"> {
  categories?: Array<Category>;
}

interface CategoryWithProductCount extends Category {
  productCount: number;
}

interface BlogCategoriesResult {
  blogcategories: Array<Blogcategory>;
}

const getCategories = async (quantity?: number): Promise<CategoryWithProductCount[]> => {
  try {
    const query = quantity
      ? `*[_type == 'category'] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == 'category'] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;
    const { data } = await sanityFetch({ query, params: quantity ? { quantity } : {}, perspective: "published" });
    return (data as CategoryWithProductCount[]) ?? [];
  } catch (error) {
    console.log("Error fetching categories", error);
    return [];
  }
};

const getAllBrands = async (): Promise<Brand[]> => {
  try {
    const { data } = await sanityFetch({ query: BRANDS_QUERY });
    return (data as Brand[]) ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getLatestBlogs = async (): Promise<BlogWithCategories[]> => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return (data as BlogWithCategories[]) ?? [];
  } catch (error) {
    console.log("Error fetching latest Blogs:", error);
    return [];
  }
};

const getDealProducts = async (): Promise<ProductWithCategories[]> => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return (data as ProductWithCategories[]) ?? [];
  } catch (error) {
    console.log("Error fetching deal Products:", error);
    return [];
  }
};

const getProductBySlug = async (slug: string): Promise<ProductWithCategories | null> => {
  try {
    const { data } = await sanityFetch({ query: PRODUCT_BY_SLUG_QUERY, params: { slug } });
    return (data as ProductWithCategories) ?? null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

const getBrand = async (slug: string): Promise<BrandNameResult | null> => {
  try {
    const { data } = await sanityFetch({ query: BRAND_QUERY, params: { slug } });
    return (data as BrandNameResult) ?? null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

const getMyOrders = async (userId: string): Promise<Order[]> => {
  try {
    const { data } = await sanityFetch({ query: MY_ORDERS_QUERY, params: { userId } });
    return (data as Order[]) ?? [];
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return [];
  }
};

const getAllBlogs = async (quantity: number): Promise<BlogWithCategories[]> => {
  try {
    const { data } = await sanityFetch({ query: GET_ALL_BLOG, params: { quantity } });
    return (data as BlogWithCategories[]) ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getSingleBlog = async (slug: string): Promise<BlogWithFullCategories | null> => {
  try {
    const { data } = await sanityFetch({ query: SINGLE_BLOG_QUERY, params: { slug } });
    return (data as BlogWithFullCategories) ?? null;
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return null;
  }
};

const getBlogCategories = async (): Promise<BlogCategoriesResult[]> => {
  try {
    const { data } = await sanityFetch({ query: BLOG_CATEGORIES });
    return (data as BlogCategoriesResult[]) ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getOthersBlog = async (slug: string, quantity: number): Promise<BlogWithCategories[]> => {
  try {
    const { data } = await sanityFetch({ query: OTHERS_BLOG_QUERY, params: { slug, quantity } });
    return (data as BlogWithCategories[]) ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getProductsByCategorySlug = async (slug: string): Promise<ProductWithCategories[]> => {
  try {
    const { data } = await sanityFetch({ query: PRODUCTS_BY_CATEGORY_SLUG, params: { slug } });
    return (data as ProductWithCategories[]) ?? [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export {
  getCategories,
  getAllBrands,
  getLatestBlogs,
  getDealProducts,
  getProductBySlug,
  getBrand,
  getMyOrders,
  getAllBlogs,
  getSingleBlog,
  getBlogCategories,
  getOthersBlog,
  getProductsByCategorySlug,
  type ProductWithCategories,
  type BlogWithCategories,
  type BlogCategoriesResult,
};