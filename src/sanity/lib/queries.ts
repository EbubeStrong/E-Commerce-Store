// import { groq } from "next-sanity";
// import { client } from "./client";

// export const getBrand = async (slug: string) => {
//   return client.fetch(
//     groq`*[_type == "brand" && slug.current == $slug][0]{
//       _id,
//       title,
//       slug,
//       description,
//       image
//     }`,
//     { slug }
//   );
// };

// export const getProduct = async (slug: string) => {
//   return client.fetch(
//     groq`*[_type == "product" && slug.current == $slug][0]{
//       _id,
//       name,
//       slug,
//       images,
//       description,
//       price,
//       discount,
//       categories[]->{_id, title, slug},
//       stock,
//       brand->{_id, title, slug},
//       status,
//       variant,
//       isFeatured
//     }`,
//     { slug }
//   );
// };

// export const getProducts = async () => {
//   return client.fetch(
//     groq`*[_type == "product"]|order(_createdAt desc){
//       _id,
//       name,
//       slug,
//       images,
//       description,
//       price,
//       discount,
//       categories[]->{_id, title, slug},
//       stock,
//       brand->{_id, title, slug},
//       status,
//       variant,
//       isFeatured
//     }`
//   );
// };

// export const getCategories = async () => {
//   return client.fetch(
//     groq`*[_type == "category"]|order(title asc){
//       _id,
//       title,
//       slug,
//       description,
//       range,
//       featured,
//       image
//     }`
//   );
// };

// export const getBrands = async () => {
//   return client.fetch(
//     groq`*[_type == "brand"]|order(title asc){
//       _id,
//       title,
//       slug,
//       description,
//       image
//     }`
//   );
// };