import { groq } from "next-sanity";

export const PROJECTS_QUERY = groq`
  *[_type == "project" && hidden != true] | order(order asc) {
    "id": slug.current,
    title,
    category,
    description,
    url,
    gradient,
    services,
    "images": images[].asset->url,
    caseStudy[] {
      heading,
      text,
      links[] { word, href }
    }
  }
`;

export const TESTIMONIALS_QUERY = groq`
  *[_type == "testimonial"] | order(order asc) {
    name,
    title,
    initials,
    quote
  }
`;
