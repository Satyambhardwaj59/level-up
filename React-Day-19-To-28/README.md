# 📅 Challenge Progress

| Day | Topic | Status |
|:---:|------------------------------|:------:|
| **React.js** | | |
| 19 | React Introduction, Setup & JSX | ✅ |
| 20 | React Components, Props & Rendering | ✅ |
| 21 | React State, Event Handling & Forms | ✅ |
| 22 | Event Handling & Conditional Rendering | ✅ |
| 23 | React Router & Navigation| ✅ |
| 24 | React API Integration & Data Fetching | ✅ |
| 25 | React State Management (Context API & Redux Toolkit) | ✅ |
| 26 | Context API & API Integration | ⏳ |
| 27 | Performance Optimization & Custom Hooks | ⏳ |
| 28 | Redux Toolkit | ⏳ |
| 29 | Build a Complete React Project | ⏳ |
| 30 | Deployment & Final Project | ⏳ |


---


# 📚 Topics Covered


# 📅 Day 19 – React Introduction, Setup & JSX

Today marks the beginning of my **React.js journey**. I explored the fundamentals of React, learned how to set up a React project with Vite, understood JSX syntax, and discovered how React efficiently updates the UI using the Virtual DOM.

---

## 📚 Topics Covered

### 🌟 Introduction to React

- What is React?
- Why React?
- Features of React
- Advantages & Limitations
- React vs Vanilla JavaScript
- React Ecosystem

---

### 🏗️ React Setup

- Create a React App with Vite
- Project Structure
- Understanding `package.json`
- Understanding `node_modules`
- Development Server

---

### ⚛️ JSX (JavaScript XML)

- What is JSX?
- JSX Syntax Rules
- Expressions in JSX
- Embedding JavaScript in JSX
- JSX vs HTML
- Self-closing Tags
- Fragments (`<>...</>`)

---

### 🎨 Rendering Elements

- Root Element
- Rendering JSX
- Rendering Variables
- Rendering Objects
- Rendering Arrays

---

### 🧠 React Concepts

- Components Overview
- Virtual DOM
- Real DOM vs Virtual DOM
- Reconciliation (Introduction)

---

## 🎯 Learning Outcomes

By the end of this session, I was able to:

- Understand what React is and why it is widely used for building user interfaces.
- Compare React with traditional Vanilla JavaScript applications.
- Set up a React project using Vite and understand its folder structure.
- Learn the purpose of `package.json` and `node_modules`.
- Write and render JSX with proper syntax.
- Embed JavaScript expressions inside JSX.
- Understand the differences between JSX and HTML.
- Learn how React renders UI using the Virtual DOM.
- Understand the basics of React's reconciliation process.

---

# 📅 Day 20 – React Components, Props & Rendering

Today I learned how to build reusable UI using **Functional Components**, pass data with **Props**, render content conditionally, and display dynamic lists in React. These concepts form the foundation of every React application.


## 📚 Topics Covered

### ⚛️ Functional Components

- What is a Component?
- Functional Components
- Naming Conventions
- Export & Import Components
- Component Composition


### 📦 Props

- What are Props?
- Passing Props
- Props Destructuring
- Default Props
- Passing Objects & Arrays as Props
- Passing Functions as Props
- `children` Prop


### 🔀 Conditional Rendering

- `if...else`
- Ternary Operator (`? :`)
- Logical AND (`&&`)
- Rendering `null`


### 📋 Rendering Lists

- `map()`
- Importance of `key`
- Why not use array index as a key?
- Rendering Dynamic Data


### 🏗️ Component Best Practices

- Keep Components Small
- Reusable Components
- Separation of Concerns
- Folder Structure


## 🎯 Learning Outcomes

By the end of this session, I was able to:

- Build reusable UI using functional components.
- Organize applications using component composition.
- Pass and receive data using props.
- Destructure props for cleaner and more readable code.
- Pass objects, arrays, functions, and JSX through props.
- Use the `children` prop to create flexible and reusable components.
- Render UI conditionally using different React techniques.
- Display dynamic data efficiently with the `map()` method.
- Understand the importance of unique `key` props for list rendering.
- Follow React best practices for writing clean, maintainable, and reusable components.

---

# 📅 Day 21 – React State, Event Handling & Forms

Today I learned how React manages dynamic data using **State**, handles user interactions through **Events**, and builds interactive forms with controlled components. These concepts are essential for creating responsive and interactive React applications.


## 📚 Topics Covered

### ⚛️ React State

- What is State?
- Why do we need State?
- `useState` Hook
- Initial State
- Updating State
- Functional State Updates
- State vs Regular Variables


### 🖱️ Event Handling

- Handling Click Events
- Passing Arguments to Event Handlers
- Event Object
- Inline Functions vs Separate Functions
- React Synthetic Events


### 📝 Forms in React

- Controlled Components
- Handling Input Fields
- Handling Multiple Inputs
- Form Submission
- `preventDefault()`


### 🔄 State Management Concepts

- Lifting State Up
- Sharing State Between Components
- One-way Data Flow


### ⚡ Best Practices

- Never Mutate State Directly
- Use Functional Updates When Needed
- Keep State Minimal
- State Colocation


## 🎯 Learning Outcomes

By the end of this session, I was able to:

- Understand the purpose of state in React applications.
- Manage component data using the `useState` Hook.
- Update state correctly using both direct and functional updates.
- Differentiate between state and regular JavaScript variables.
- Handle user interactions through React event handlers.
- Work with React's Synthetic Events and event objects.
- Build controlled forms by managing input values with state.
- Handle multiple form fields and process form submissions.
- Prevent default browser behavior using `preventDefault()`.
- Share data between components by lifting state up.
- Follow React best practices for efficient and maintainable state management.

---

# 📅 Day 22 – React Hooks, Performance Optimization & Custom Hooks

Today I learned about powerful React Hooks that help manage side effects, access DOM elements, optimize application performance, and reuse logic across multiple components.


## 📚 Topics Covered

### ⚛️ useEffect

- What is `useEffect`?
- Why do we need it?
- Dependency Array
- No Dependency Array vs Empty Dependency Array vs Dependencies
- Cleanup Function
- Common Mistakes


### 📌 useRef

- What is `useRef`?
- Accessing DOM Elements
- Persisting Values Without Re-rendering
- Difference between `useRef` and `useState`


### 🚀 Performance Hooks

## useMemo

- Why use `useMemo`?
- Memoizing Expensive Calculations
- Dependency Array

## useCallback

- Why use `useCallback`?
- Memoizing Functions
- Preventing Unnecessary Re-renders


### 🛠️ Custom Hooks (Introduction)

- What is a Custom Hook?
- Rules for Creating Custom Hooks
- Reusing Logic Across Components


## 🎯 Learning Outcomes

By the end of this session, I was able to:

- Understand how `useEffect` manages side effects in React components.
- Work with dependency arrays and control when effects should run.
- Implement cleanup functions to prevent memory leaks.
- Understand the difference between `useRef` and `useState`.
- Access and manipulate DOM elements using `useRef`.
- Store values without triggering unnecessary re-renders.
- Optimize React performance using `useMemo` and `useCallback`.
- Understand how memoization helps avoid unnecessary calculations and renders.
- Create reusable logic using custom hooks.
- Follow React Hook rules and best practices.

---

# 📅 Day 23 – React Router & Navigation

Today I learned how to implement **client-side routing** in React applications using React Router. I explored how Single Page Applications (SPAs) manage multiple pages without refreshing the browser and learned how to create dynamic and protected routes.


## 📚 Topics Covered

### 🛣️ React Router Basics

- What is React Router?
- Why do we need routing in React?
- SPA Navigation vs Traditional Page Reload
- Installing React Router DOM
- `BrowserRouter`


### 🔗 Creating Routes

- `Routes` Component
- `Route` Component
- Creating Multiple Pages
- Default Routes
- 404 Not Found Routes


### 🧭 Navigation

- `Link` Component
- `NavLink` Component
- Difference between `Link` and `NavLink`
- Active Navigation Styling


### 🚀 Programmatic Navigation

- `useNavigate()`
- Redirecting After Actions
- Navigation with State


### 📌 Dynamic Routing

- URL Parameters
- `useParams()`
- Dynamic Pages
- Fetching Data Based on Params


### 🏗️ Advanced Routing

- Nested Routes
- Layout Routes
- `Outlet` Component
- Protected Routes (Introduction)


## 🎯 Learning Outcomes

By the end of this session, I was able to:

- Understand the importance of routing in React Single Page Applications.
- Set up React Router using `react-router-dom`.
- Create multiple pages and navigate between them without page reloads.
- Use `Routes` and `Route` components to define application routes.
- Implement navigation using `Link` and `NavLink`.
- Navigate programmatically using the `useNavigate()` Hook.
- Create dynamic routes using URL parameters.
- Fetch data based on dynamic route parameters.
- Build nested layouts using nested routes and the `Outlet` component.
- Understand the basics of protected routes for authentication-based navigation.

---

# 📅 Day 24 – React API Integration & Data Fetching

Today I learned how to fetch and manage data from external APIs in React applications. I explored different ways to make API requests, handle various UI states, optimize search performance, and organize API-related code following best practices.


## 📚 Topics Covered

### 🌐 API Basics

- What is an API?
- REST API Basics
- HTTP Methods (GET, POST, PUT, DELETE)
- Understanding JSON Responses


### 📡 Fetching Data

- Fetch API
- Axios
- Async/Await
- Handling API Responses


### ⚛️ React & APIs

- `useEffect` for API Calls
- Fetch Data on Component Mount
- Dependency Array with APIs
- Cleanup Function (`AbortController`)


### ⏳ UI States

- Loading State
- Error State
- Empty State
- Skeleton Loaders (Introduction)


### 🔍 Search & Optimization

- Search Functionality
- Debouncing Search Input
- Pagination
- Infinite Scroll (Introduction)


### 📁 Best Practices

- Environment Variables (`.env`)
- API Key Security
- Reusable API Functions
- Folder Structure for API Services


## 🎯 Learning Outcomes

By the end of this session, I was able to:

- Understand how REST APIs work and communicate with React applications.
- Make API requests using both the Fetch API and Axios.
- Handle asynchronous operations with `async`/`await`.
- Fetch data safely inside `useEffect`.
- Prevent memory leaks using `AbortController`.
- Manage loading, error, and empty states for a better user experience.
- Implement search functionality with debouncing for improved performance.
- Understand the basics of pagination and infinite scrolling.
- Secure API keys using environment variables.
- Organize API logic into reusable service functions for better maintainability.

---

# 📅 Day 25 – React State Management (Context API & Redux Toolkit)

Today I learned how to manage application state efficiently in React. I explored the differences between local and global state, used the Context API to avoid prop drilling, and learned how Redux Toolkit simplifies scalable state management.


## 📚 Topics Covered

### 🌍 State Management Basics

- Local State vs Global State
- What is Prop Drilling?
- When to Use Global State
- State Management Strategies


### ⚛️ Context API

- What is Context API?
- `createContext()`
- `Context.Provider`
- `useContext()`
- Avoiding Prop Drilling
- Context Best Practices


### 🔄 useReducer

- Why `useReducer`?
- Reducer Function
- Actions
- Dispatch
- Combining `useReducer` with Context API


### 🧰 Redux Toolkit

- Why Redux Toolkit?
- Redux Architecture
- Store
- Slice
- Reducers
- Actions
- `configureStore()`
- `createSlice()`


### 🚀 Async State (Introduction)

- `createAsyncThunk()`
- Loading State
- Error State
- API Integration with Redux Toolkit


### 📁 Best Practices

- Folder Structure
- Keep State Minimal
- Normalize State
- When to Use Context vs Redux


## 🎯 Learning Outcomes

By the end of this session, I was able to:

- Differentiate between local state and global state in React.
- Understand the problem of prop drilling and how to avoid it.
- Create and consume shared state using the Context API.
- Use `useReducer` to manage complex state updates.
- Combine `useReducer` with the Context API for scalable state management.
- Understand Redux architecture and the role of the store, slices, reducers, and actions.
- Configure a Redux store using `configureStore()`.
- Create slices using `createSlice()` to simplify Redux logic.
- Learn the basics of asynchronous state management with `createAsyncThunk()`.
- Choose the right state management solution by understanding when to use Context API versus Redux Toolkit.

---

# 📁 Repository Structure

```text
React-Day-19-To-28/

├── src/
│   ├── Day-19/
│   ├── Day-20/
│   ├── Day-21/
│   ├── Day-22/
│   ├── Day-23/
│   ├── Day-24/
│   ├── Day-25/
│   ├── Day-26/
│   ├── Day-27/
│   ├── Day-28/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
└── README.md
```