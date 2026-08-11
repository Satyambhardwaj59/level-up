import { Blog } from "@/types/day-37";

export const blogs: Blog[] = [
  {
    slug: "nextjs-routing",
    title: "Understanding Next.js Routing",
    description:
      "Learn static, dynamic, nested and catch-all routes.",
    content:
      "Next.js App Router uses the filesystem to create application routes. It supports static routes, dynamic routes, nested routes, route groups and catch-all routes.",
  },

  {
    slug: "typescript-basics",
    title: "TypeScript Basics",
    description:
      "Learn TypeScript types, interfaces and unions.",
    content:
      "TypeScript adds static type checking to JavaScript. It helps developers catch errors during development and makes applications easier to maintain.",
  },

  {
    slug: "react-performance",
    title: "React Performance Optimization",
    description:
      "Learn memoization and rendering optimization.",
    content:
      "React provides several techniques for improving performance including React.memo, useMemo, useCallback, lazy loading and code splitting.",
  },
];