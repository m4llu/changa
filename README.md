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

