# React + Vite Starter Template

A minimal and fast setup for building React applications with **Vite**, including Hot Module Replacement (HMR) and basic ESLint rules to ensure code quality.

---

## Official React Plugins

Choose between two officially supported plugins for enabling Fast Refresh in your React project:

- **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)**  
  Uses **Babel** for Fast Refresh support.

- **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)**  
  Uses **SWC** for faster compilation and Fast Refresh.

---

## Enhancing ESLint Configuration

For production-level applications, we highly recommend integrating **TypeScript** to enable type-aware linting and catch more errors during development.

Explore the [React + TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for guidance on combining React, TypeScript, and [`typescript-eslint`](https://typescript-eslint.io).

---

## Getting Started

Follow these steps to get your project up and running:

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate into the project directory
cd your-project-folder

# Install dependencies
npm install

# Start the development server with Hot Module Replacement (HMR)
npm run dev
