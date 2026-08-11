# 📅 Challenge Progress

| Day | Topic | Status |
|:---:|------------------------------|:------:|
| **NextJs** | | |
| 36 | Next.js Fundamentals, App Router & Navigation | ✅ |

---

# 📚 Topics Covered

# 📅 Day 36 – Next.js Fundamentals, App Router & Navigation

Today I started my **Next.js journey** after completing my React and TypeScript learning phases. I explored the fundamentals of Next.js, understood how it differs from React, learned the App Router and file-based routing system, and practiced layouts, navigation, rendering concepts, and TypeScript integration.

---

## 📚 Topics Covered

### 🌟 Introduction to Next.js

- What is Next.js?
- Next.js vs React
- Why use Next.js?
- Benefits of Next.js
- File-Based Routing
- App Router
- Server-Side Rendering — Basic Understanding
- Static Rendering — Basic Understanding
- Full-Stack Capabilities of Next.js

---

### 📄 Next.js App Router Files

- `page.tsx`
- `layout.tsx`
- `globals.css`
- `loading.tsx`
- `error.tsx`
- `not-found.tsx`

---

### 🛣️ File-Based Routing

- Root Routes
- Creating Routes with Folders
- Root Layout
- Nested Layouts
- Shared UI
- `children` Prop
- Route Structure

---

### 🏗️ Layouts & Shared UI

- Root Layout
- Nested Layouts
- Shared UI
- `children` Prop
- Layout Hierarchy
- Reusable Layout Components

---

### 📝 Metadata

- What is Metadata?
- Page Metadata
- Layout Metadata
- `title`
- `description`
- Basic SEO Concepts

---

### 🧭 Navigation

- `Link`
- `useRouter`
- `usePathname`
- `useSearchParams`
- Programmatic Navigation
- Dynamic Navigation
- Query Parameters

---

### 🖥️ Rendering Concepts

- Server-Side Rendering — Introduction
- Static Rendering — Introduction
- Client-Side Rendering — Basic Comparison
- Server Components — Introduction
- Client Components — Introduction
- `"use client"`

---

### 🟦 TypeScript in Next.js

- TypeScript with Next.js
- `.tsx` Files
- Component Props
- Typing `children`
- Type-Safe Components
- Type-Safe Pages
- TypeScript Configuration

---

### 🚀 Full-Stack Capabilities

- Frontend Development with Next.js
- Server-Side Logic
- Route Handlers — Introduction
- Server Actions — Introduction
- Database Integration — Introduction
- Full-Stack Application Architecture

---

## 🎯 Learning Outcomes

By the end of this session, I was able to:

- Understand what Next.js is and how it extends React.
- Explain the major differences between React and Next.js.
- Understand why Next.js is useful for building modern web applications.
- Create routes using the App Router and file-based routing.
- Understand the purpose of `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, and `not-found.tsx`.
- Create root and nested layouts for shared UI.
- Understand how the `children` prop works with layouts.
- Add metadata for pages and improve basic SEO.
- Navigate between pages using the `Link` component.
- Perform programmatic navigation using `useRouter`.
- Access the current URL using `usePathname`.
- Read query parameters using `useSearchParams`.
- Understand the basic concepts of Server-Side Rendering and Static Rendering.
- Understand Server Components and Client Components.
- Use `"use client"` when client-side functionality is required.
- Work with TypeScript in Next.js using `.tsx` files.
- Create type-safe components and props.
- Understand the full-stack capabilities of Next.js.

---

# 📅 Day 37 – Next.js Routing & Navigation

Today I went deeper into **Next.js App Router** and learned how to build and navigate between different types of routes. I explored dynamic and nested routes, route groups, catch-all routes, query parameters, programmatic navigation, and route-level loading and error handling.

---

## 📚 Topics Covered

### 🛣️ Static Routes

- Creating Static Routes
- Route Folders
- `page.tsx`
- Navigating Between Static Pages

---

### 🔄 Dynamic Routes

- Dynamic Route Segments
- `[id]` Syntax
- Dynamic Page Rendering
- Accessing Dynamic Route Parameters
- Building Dynamic Pages

Example:

```text
app/
└── products/
    └── [id]/
        └── page.tsx
```        

### 🌳 Nested Routes
- Creating Nested Routes
- Nested Route Structure
- Parent and Child Routes
- Nested Layouts
- Shared UI Between Nested Routes

#### Example
```test
app/
└── dashboard/
    ├── page.tsx
    ├── settings/
    │   └── page.tsx
    └── profile/
        └── page.tsx

```

### 📁 Route Groups
- What are Route Groups?
- (group) Syntax
- Organizing Routes Without Changing URLs
- Shared Layouts with Route Groups

#### Example
```text 

app/
├── (marketing)/
│   ├── about/
│   └── contact/
│
└── (dashboard)/
    ├── dashboard/
    └── settings/
```

### 🧩 Catch-All Routes
- What are Catch-All Routes?
- [...slug]
- Handling Multiple URL Segments
- Dynamic Content with Catch-All Routes

#### Example
```text 
app/
└── docs/
    └── [...slug]/
        └── page.tsx
```

### 🔎 Query Parameters
- What are Query Parameters?
- Reading URL Search Parameters
- useSearchParams
- Filtering and Searching with Query Parameters

### 🔗 Link Navigation
- <Link> Component
- Client-Side Navigation
- Dynamic Links
- Navigation Between Routes

### 🚀 Programmatic Navigation
- useRouter
- router.push()
- router.replace()
- router.back()
- router.forward()
- Navigation After Actions

### 🔍 useSearchParams
- Reading Query Parameters
- Accessing Search Values
- Search and Filter Functionality
- Using URL State


---