import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "gradient",
      title: "Gradient (CSS)",
      type: "string",
      description: "e.g. linear-gradient(135deg, #48949e 0%, #2a5a62 100%)",
    }),
    defineField({
      name: "services",
      title: "Services",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "string" }],
      description: "Paths relative to /public (e.g. /sean-corey-design-moka-1.webp)",
    }),
    defineField({
      name: "caseStudy",
      title: "Case Study",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "heading", title: "Heading", type: "string" }),
            defineField({ name: "text", title: "Text", type: "text", rows: 5, validation: (r) => r.required() }),
            defineField({
              name: "links",
              title: "Inline Links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "word", title: "Word to Link", type: "string" }),
                    defineField({ name: "href", title: "URL", type: "url" }),
                  ],
                },
              ],
            }),
          ],
          preview: {
            select: { title: "heading", subtitle: "text" },
            prepare: ({ title, subtitle }) => ({
              title: title ?? "(no heading)",
              subtitle,
            }),
          },
        },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
    }),
    defineField({
      name: "hidden",
      title: "Hidden",
      type: "boolean",
      description: "Hide this project from the site",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
