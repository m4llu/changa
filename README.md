# Changa Website

Welcome to the Changa Website repository! This document provides instructions on how to run the project and gives an overview of its components.

## Table of Contents
- [Getting Started](#getting-started)
- [Running the Project](#running-the-project)
- [Project Structure](#project-structure)
- [Components Overview](#components-overview)

## Getting Started

To get started with the Changa Website, ensure you have the following prerequisites installed on your machine:

- Node.js (v14 or higher)
- npm (v6 or higher) or yarn (v1.22 or higher)

Clone the repository to your local machine:

```bash
cd changa-website
```

## Running the Project

Install the project dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

The project structure is organized as follows:

```
changa-website/
├── src/
│   ├── components/
│   │   ├── Common/
│   │   │   └── Button.tsx
│   │   ├── Pages/
│   │   │   ├── Home/
│   │   │   │   └── HomeProductSection.tsx
│   │   │   ├── Discover/
│   │   │   │   └── Dashboard.tsx
│   │   └── Navbar.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useStickyNav.ts
│   ├── App.tsx
│   └── index.tsx
├── public/
│   └── index.html
├── package.json
└── README.md
```

## Components Overview

### `App.tsx`
The main application component that sets up the context providers and handles user authentication state.

### `Button.tsx`
A reusable button component with various props for customization, such as `variant`, `size`, `fullWidth`, `cartButton`, and `disabled`.

