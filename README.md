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
└── 📁changa-website
    └── 📁public
        └── vite.svg
    └── 📁src
        └── 📁assets
            └── 📁icons
                └── icons
            └── 📁images
                └── images
        └── 📁components
            └── 📁common
                └── 📁Button
                    └── Button.scss
                    └── Button.tsx
                    └── CartButton.scss
                    └── CartButton.tsx
                └── 📁Input
                    └── Input.scss
                    └── Input.tsx
            └── 📁dev
                └── 📁ProductForm
                    └── DevPage.tsx
                    └── ProductForm.scss
                    └── ProductForm.tsx
            └── 📁features
                └── 📁Adversitement
                    └── Adversitement.scss
                    └── Adversitement.tsx
                    └── DarkModePrompt.tsx
                    └── SpinWheel.tsx
                └── 📁banners
                    └── 📁ArtistListBanner
                        └── ArtistListBanner.scss
                        └── ArtistListBanner.tsx
                    └── 📁CollectionBanner
                        └── BannerImage.svg
                        └── CollectionBanner.scss
                        └── CollectionBanner.tsx
                └── 📁ProductList
                    └── 📁ProductCard
                        └── ProductCard.scss
                        └── ProductCard.tsx
                    └── ProductList.scss
                    └── ProductList.tsx
            └── 📁layout
                └── 📁Footer
                    └── Footer.scss
                    └── Footer.tsx
                └── 📁Navbar
                    └── AnnouncementBar.scss
                    └── AnnouncementBar.tsx
                    └── Navbar.scss
                    └── Navbar.tsx
            └── 📁pages
                └── 📁About
                    └── AboutPage.scss
                    └── AboutPage.tsx
                └── 📁Dashboard
                    └── Dashboard.tsx
                └── 📁Find
                    └── AlbumPage.scss
                    └── AlbumPage.tsx
                └── 📁Home
                    └── 📁HomeProductSection
                        └── HomeProductSection.scss
                        └── HomeProductSection.tsx
                    └── Home.tsx
                └── 📁Login
                    └── Login.scss
                    └── Login.tsx
            └── 📁Sections
                └── Sections.tsx
            └── ProtectedRoute.tsx
        └── 📁context
            └── AuthContext.tsx
        └── 📁hooks
            └── useStickyNav.tsx
        └── 📁scss
            └── _variables.scss
            └── main.scss
        └── 📁types
            └── Product.ts
            └── User.ts
        └── App.tsx
        └── index.css
        └── main.tsx
        └── vite-env.d.ts
    └── .env
    └── .gitignore
    └── eslint.config.js
    └── example.env
    └── index.html
    └── package-lock.json
    └── package.json
    └── tsconfig.app.json
    └── tsconfig.json
    └── tsconfig.node.json
    └── vite.config.ts
    └── YE.ico
```

## Components Overview

### `App.tsx`
The main application component that sets up the context providers and handles user authentication state.

### `Button.tsx`
A reusable button component with various props for customization, such as `variant`, `size`, `fullWidth`, `cartButton`, and `disabled`.

### `AuthContext.tsx`
Provides authentication context to manage user login and logout functionality across the application.

### `useStickyNav.ts`
A custom hook to manage the navbar animation behavior when scrolling, including sticky and show/hide functionality.

### `HomeProductSection.tsx`
A component that displays a section of products on the home page, fetching data from the API and handling loading and error states.

### `Dashboard.tsx`
A component within the Discover page that provides an overview or dashboard view of the available content.

### `Navbar.tsx`
The navigation bar component that includes links to different sections of the website and handles sticky behavior using the `useStickyNav` hook.

### `Adversitement.tsx`
A component that displays a popup advertisement with a spinning wheel and a close button, managing body scroll lock when the popup is visible.

### `ShoppingCartButton.tsx`
A button component specifically designed for adding products to the shopping cart, including an icon and truncating long album names.

### `CollectionBanner.tsx`
A banner component that adjusts its margin based on the height of a logo container and includes functionality to scroll to the next section.

### `ProductList.tsx`
A component that displays a list of products in either grid or list layout, with optional search functionality and add-to-cart actions.

### `AboutPage.tsx`
A page component that provides information about the website, including the mission and team behind it.

### `AlbumPage.tsx`
A page component that displays a list of albums, fetching data from the API and handling loading and error states.

### `Home.tsx`
The home page component that includes a banner, artist list banner, and a section for displaying products.

