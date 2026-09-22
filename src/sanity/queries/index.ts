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
  SINGLE_BLOG_QUERY,
} from "./query";
import type { Blog, Blogcategory, Brand, Category, Order, Product } from "@/sanity.types";

interface BrandNameResult {
  brandName: string;
}

const getCategories = async (quantity?: number): Promise<Category[]> => {
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
    const { data } = await sanityFetch({ query, params: quantity ? { quantity } : {} });
    return (data as Category[]) ?? [];
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

const getLatestBlogs = async (): Promise<Blog[]> => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return (data as Blog[]) ?? [];
  } catch (error) {
    console.log("Error fetching latest Blogs:", error);
    return [];
  }
};

const getDealProducts = async (): Promise<Product[]> => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return (data as Product[]) ?? [];
  } catch (error) {
    console.log("Error fetching deal Products:", error);
    return [];
  }
};

const getProductBySlug = async (slug: string): Promise<Product | null> => {
  try {
    const { data } = await sanityFetch({ query: PRODUCT_BY_SLUG_QUERY, params: { slug } });
    return (data as Product) ?? null;
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

const getAllBlogs = async (quantity: number): Promise<Blog[]> => {
  try {
    const { data } = await sanityFetch({ query: GET_ALL_BLOG, params: { quantity } });
    return (data as Blog[]) ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getSingleBlog = async (slug: string): Promise<Blog | null> => {
  try {
    const { data } = await sanityFetch({ query: SINGLE_BLOG_QUERY, params: { slug } });
    return (data as Blog) ?? null;
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return null;
  }
};

const getBlogCategories = async (): Promise<Blogcategory[]> => {
  try {
    const { data } = await sanityFetch({ query: BLOG_CATEGORIES });
    return (data as Blogcategory[]) ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
    return [];
  }
};

const getOthersBlog = async (slug: string, quantity: number): Promise<Blog[]> => {
  try {
    const { data } = await sanityFetch({ query: OTHERS_BLOG_QUERY, params: { slug, quantity } });
    return (data as Blog[]) ?? [];
  } catch (error) {
    console.log("Error fetching all brands:", error);
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
};