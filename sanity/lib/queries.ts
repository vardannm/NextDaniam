import { defineQuery } from "next-sanity";
export const STARTUPS_QUERY = defineQuery(`*[_type == 'startup' && defined(slug.current)]{
  _id,title,slug,views,createdAt,author -> {
    _id,name,image,bio
  },description,category,image
}`)