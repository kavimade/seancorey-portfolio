import { groq } from "next-sanity";

export type SanityProject = {
  id: string;
  title: string;
  category: string;
  description: string;
  url?: string;
  gradient?: string;
  services?: string[];
  images?: string[];
  caseStudy?: {
    heading?: string | null;
    text: string;
    links?: { word: string; href: string }[];
  }[];
};

export type SanityTestimonial = {
  name: string;
  title?: string;
  initials: string;
  quote: string;
};

export const PROJECTS_QUERY = groq`
  *[_type == "project" && hidden != true] | order(order asc) {
    "id": slug.current,
    title,
    category,
    description,
    url,
    gradient,
    services,
    images,
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
