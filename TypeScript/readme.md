# 📅 Challenge Progress

| Day | Topic | Status |
|:---:|------------------------------|:------:|
| **TypeScript** | | |
| 29 | TypeScript Fundamentals & Getting Started | ✅ |
| 30 | TypeScript Functions, Objects, Type Aliases & Interfaces | ✅ |
| 31 | TypeScript Advanced Types & Type Narrowing | ✅ |
| 32 | Generics & Reusable Types | ✅ |
| 33 | Utility Types & Advanced Type Manipulation | ✅ |
| 34 | TypeScript with React | ✅ |
| 35 | TypeScript Revision & Production-Ready Capstone | ✅ |

---

# 📚 Topics Covered

# 📅 Day 29 – TypeScript Fundamentals & Getting Started

Today marks the beginning of my **TypeScript journey**. I explored why TypeScript has become the standard for modern JavaScript development, learned how to set up a TypeScript project, understood its type system, and configured the compiler for scalable applications.


### 🌟 Introduction to TypeScript

- What is TypeScript?
- Why TypeScript?
- JavaScript vs TypeScript
- Advantages of TypeScript
- How TypeScript Works


### ⚙️ Setting Up TypeScript

- Install TypeScript
- Compile `.ts` Files
- `tsconfig.json`
- Strict Mode
- Target & Module Options


### 🔤 Basic Types

- `string`
- `number`
- `boolean`
- `bigint`
- `symbol`


### 📦 Complex Types

- Arrays
- Tuples
- Enums
- Objects


### 🎯 Special Types

- `any`
- `unknown`
- `never`
- `void`


### 🧠 Type Inference

- Explicit Typing
- Implicit Typing
- When to Use Each


### 📁 TypeScript Configuration

- `tsconfig.json`
- `strict`
- `noImplicitAny`
- `outDir`
- `rootDir`


## 🎯 Learning Outcomes

By the end of this session, I was able to:

- Understand what TypeScript is and how it extends JavaScript.
- Explain the benefits of static typing for building scalable applications.
- Set up a TypeScript development environment from scratch.
- Compile TypeScript files into JavaScript.
- Configure a project using `tsconfig.json`.
- Work with TypeScript's built-in primitive and complex data types.
- Understand the purpose of special types like `any`, `unknown`, `never`, and `void`.
- Differentiate between explicit and implicit type inference.
- Configure compiler options such as `strict`, `noImplicitAny`, `rootDir`, and `outDir`.
- Write safer, more maintainable, and type-safe code.

---

# 📅 Day 30 – TypeScript Functions, Objects, Type Aliases & Interfaces

Today I explored how TypeScript makes code more robust through type-safe functions, object type annotations, reusable type aliases, and interfaces. These concepts are essential for building scalable, maintainable, and production-ready applications.


## 📚 Topics Covered

### 🔧 Functions

- Function Type Annotations
- Parameter Types
- Return Types
- Optional Parameters (`?`)
- Default Parameters
- Rest Parameters
- Function Types
- Arrow Functions
- Function Overloading


### 📦 Objects

- Object Type Annotations
- Nested Objects
- `readonly` Properties
- Optional Properties
- Index Signatures


### 🏷️ Type Aliases

- Creating Type Aliases
- Reusing Types
- Nested Type Aliases
- Union Types with Type Aliases


### 📄 Interfaces

- Creating Interfaces
- Extending Interfaces
- Interface Inheritance
- Interfaces for Functions
- Interfaces for Arrays
- Interfaces for Classes


### ⚖️ Interface vs Type Alias

- Key Differences
- When to Use Each
- Best Practices


## 🎯 Learning Outcomes

By the end of this session, I was able to:

- Write type-safe functions with parameter and return type annotations.
- Use optional, default, and rest parameters effectively.
- Define function types and understand function overloading.
- Create strongly typed objects with nested structures.
- Use `readonly`, optional properties, and index signatures to model flexible data.
- Build reusable and maintainable code using type aliases.
- Create and extend interfaces for objects, functions, arrays, and classes.
- Understand the similarities and differences between interfaces and type aliases.
- Choose the appropriate approach based on the use case and TypeScript best practices.
- Write cleaner, safer, and more scalable TypeScript code.

---


# 📅 Day 31 – TypeScript Advanced Types & Type Narrowing

Today I explored advanced TypeScript features that make applications more flexible and type-safe. I learned how to work with union and intersection types, perform type narrowing with type guards, use type assertions safely, and write cleaner code with optional chaining and nullish coalescing.


## 📚 Topics Covered

### 🔀 Union Types

- What are Union Types?
- Combining Multiple Types
- Real-world Examples

```ts
let id: string | number;

id = 101;
id = "EMP-101";
```


### 🤝 Intersection Types

- What are Intersection Types?
- Combining Multiple Interfaces
- Reusable Data Models

```ts
type Employee = {
  id: number;
  name: string;
};

type Admin = {
  permissions: string[];
};

type AdminEmployee = Employee & Admin;
```


### 🎯 Literal Types

- String Literal Types
- Number Literal Types
- Boolean Literal Types

```ts
type Status = "pending" | "success" | "failed";
```


### 🛡️ Type Narrowing

- `typeof`
- `instanceof`
- `in` Operator
- Equality Narrowing


### 🔍 Type Guards

- Built-in Type Guards
- Custom Type Guards
- User-defined Type Predicates

```ts
function isString(value: unknown): value is string {
  return typeof value === "string";
}
```


### ✨ Type Assertions

- `as` Keyword
- Angle Bracket Syntax
- When to Use Type Assertions
- Risks of Incorrect Assertions


### 🚦 Discriminated Unions

- Tagged Types
- Exhaustive Checking
- Better Pattern Matching


### 🔗 Optional Chaining

- Safe Property Access (`?.`)
- Optional Function Calls
- Optional Element Access


### ❓ Nullish Coalescing

- `??`
- Difference Between `??` and `||`
- Default Values


## 🎯 Learning Outcomes

By the end of this session, I was able to:

- Combine multiple types using union and intersection types.
- Model complex data structures with reusable type definitions.
- Restrict values using string, number, and boolean literal types.
- Narrow types safely using `typeof`, `instanceof`, the `in` operator, and equality checks.
- Create custom type guards with user-defined type predicates.
- Use type assertions when additional type information is known.
- Understand the benefits of discriminated unions for safer pattern matching.
- Access nested properties safely using optional chaining.
- Apply nullish coalescing to provide default values without overriding valid falsy values.
- Write more expressive, maintainable, and type-safe TypeScript code.



---

# 📂 Repository Structure

```text
TypeScript/

├── Day-29/
├── Day-30/
├── Day-31/
├── Day-32/
├── Day-33/
├── Day-34/
├── Day-35/
└── readme.md

```

---
