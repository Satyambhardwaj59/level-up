# 📅 Challenge Progress

| Day | Topic | Status |
|:---:|------------------------------|:------:|
| **NextJs** | | |
| 36 | Next.js Fundamentals, App Router & Navigation | ✅ |
| 37 | Next.js Routing, Dynamic Routes & Navigation  | ✅ |
| 38 | Server Components vs Client Components in Next.js | ✅ |

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


# 📅 Day 38 – Next.js Server & Client Components

Today I explored how **Next.js handles Server Components and Client Components**. I learned how to decide where code should run, how to fetch data on the server, pass server-fetched data to interactive client components, use environment variables safely, and handle loading and error states while keeping `"use client"` usage minimal.

---

## 📚 Topics Covered

### 🖥️ React Server Components

- What are Server Components?
- Server Components in Next.js
- Default Server Component Behavior
- Benefits of Server Components
- Server-Side Rendering
- Fetching Data on the Server
- Accessing Server-Only Resources

---

### 💻 Client Components

- What are Client Components?
- `"use client"` Directive
- When Client Components are Required
- Interactive UI
- Event Handlers
- React Hooks in Client Components
- Browser APIs
- Client-Side State

---

### 🔄 `"use client"`

- What does `"use client"` do?
- When to use `"use client"`
- Client Component Boundaries
- Server → Client Component Architecture
- Avoiding Unnecessary Client Components
- Minimizing `"use client"`

---

### 🏗️ Server vs Client Component Architecture

- Server Components vs Client Components
- Choosing the Correct Component Type
- Server Component as a Parent
- Client Component as a Child
- Component Boundaries
- Keeping Static UI on the Server
- Moving Only Interactive Parts to the Client

---

### 🌐 Server-Side Data Fetching

- Fetching Data Inside Server Components
- Async Server Components
- API Requests
- Server-Side Data Processing
- Keeping Sensitive Logic on the Server
- Passing Fetched Data to UI
- Server-Side API Integration

---

### 🔄 Passing Data from Server → Client

- Passing Server Component Data as Props
- Server-to-Client Data Flow
- Keeping Data Fetching on the Server
- Making Only Interactive UI Client-Side
- Serializable Props
- Separating Data Fetching from UI Interaction

---

### ⚡ Interactive Client Components

- Click Events
- Form Interactions
- `useState`
- `useEffect`
- Browser APIs
- Interactive UI
- Client-Side State
- Event Handlers

---

### 🔐 Environment Variables

- What are Environment Variables?
- `.env` Files
- Server-Only Environment Variables
- Protecting Sensitive Configuration
- API Keys and Secrets
- Environment-Specific Configuration
- Keeping Secrets on the Server

---

### 🌍 `NEXT_PUBLIC_*` Variables

- What is `NEXT_PUBLIC_*`?
- Public Environment Variables
- Client-Side Environment Variables
- Difference Between Server-Only and Public Variables
- When to Use `NEXT_PUBLIC_*`
- Security Considerations

---

### ⏳ Loading & Error Handling

- `loading.tsx`
- Route-Level Loading UI
- Loading States
- Skeleton UI
- `error.tsx`
- Error Boundaries
- Recovering from Errors
- `reset()` Function
- Better User Experience

---

### 🎯 Minimizing `"use client"`

- Keep Server Components as the Default
- Use Client Components Only When Necessary
- Move Interactivity into Smaller Components
- Keep Data Fetching on the Server
- Avoid Making Entire Pages Client-Side
- Reduce Client-Side JavaScript
- Improve Application Performance
- Maintain a Clean Component Architecture

---

## 💻 Today's Project Upgrade

Today I upgraded my **Next.js project** by separating server-side and client-side responsibilities.

### Added:

- Server Components
- Client Components
- Server-Side Data Fetching
- Passing Data from Server → Client
- Interactive Client Components
- Environment Variables
- `NEXT_PUBLIC_*` Variables
- Loading UI
- Error Handling
- Better Component Architecture
- Minimal `"use client"` Usage

### Project Architecture

```text
app/
├── products/
│   ├── page.tsx
│   ├── loading.tsx
│   └── error.tsx
│
├── components/
│   ├── ProductList.tsx
│   └── ProductActions.tsx
│
└── layout.tsx

```

### 🎯 Learning Outcomes

By the end of this session, I was able to:

Understand React Server Components in Next.js.
Understand Client Components and the purpose of "use client".
Differentiate between Server and Client Component responsibilities.
Decide when a component should run on the server or client.
Fetch data directly inside Server Components.
Pass server-fetched data to Client Components through props.
Build interactive UI using Client Components.
Understand Server → Client Component Architecture.
Work with environment variables in Next.js.
Understand the difference between server-only variables and NEXT_PUBLIC_* variables.
Keep sensitive environment variables on the server.
Implement loading states using loading.tsx.
Handle runtime errors using error.tsx.
Reduce unnecessary "use client" usage.
Build a cleaner and more scalable Next.js architecture.
 
 --- 

# 📂 Repository Structure

```text
NextJs/my-app/src/app

├── Day-36/
├── Day-37/
├── Day-38/
├── Day-39/
├── Day-40/
├── Day-41/
├── Day-42/
├── Day-43/
├── Day-44/
├── Day-45/
└── readme.md

```

--- 