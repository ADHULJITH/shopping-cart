# Shopping Cart Application

A responsive shopping cart application built using React, TypeScript, Vite and Tailwind CSS. The application allows users to browse products, search and filter them, manage their shopping cart, and complete a three-step checkout process.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- Zustand
- Zod
- pnpm

## Features

### Product Listing

- Fetches products from DummyJSON using TanStack Query
- Validates API responses using Zod
- Displays product images, titles, categories, prices and ratings
- Handles loading, error and empty states

### Search and Filtering

- Search products by title
- Filter products by category
- Filter products by maximum price
- Combine multiple filters
- Clear all filters

### Shopping Cart

- Add and remove products
- Increase and decrease product quantities
- Minimum quantity: 1
- Maximum quantity: 5
- Cart item count displayed in the navbar
- Cart drawer with order summary
- Cart persistence using Zustand and localStorage

### Cart Calculations

- Subtotal calculation
- 5% tax
- 10% discount when subtotal exceeds $100
- Final total calculation
- Minimum checkout subtotal of $10

### Checkout

Three-step checkout process:

1. Cart Review
2. Shipping Information
3. Payment Summary

The shipping form uses React state and Zod validation. After a successful order, a confirmation message is displayed and the cart is cleared.

## Getting Started

### Prerequisites

- Node.js
- pnpm

### Installation

Clone the repository:

```bash
git clone YOUR_REPOSITORY_URL
```

Navigate into the project directory:

```bash
cd shopping-cart
```

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

Open the localhost URL displayed in the terminal.

## Available Commands

| Command        | Description                  |
| -------------- | ---------------------------- |
| `pnpm dev`     | Start the development server |
| `pnpm build`   | Create a production build    |
| `pnpm preview` | Preview the production build |
| `pnpm lint`    | Run ESLint, if configured    |

## API

Products are fetched from:

[https://dummyjson.com/products](https://dummyjson.com/products)

The application requests 30 products and validates the response using Zod.

## Limitations

- This is a frontend-only assignment project.
- The checkout process does not integrate with a real payment gateway.
- Orders are not submitted to a backend or stored in a database.
- Cart data is saved in the browser using localStorage.
- Product search and filtering operate on the products fetched by the application.

## Deployment

Live Application: ADD_DEPLOYMENT_URL

GitHub Repository: ADD_REPOSITORY_URL
