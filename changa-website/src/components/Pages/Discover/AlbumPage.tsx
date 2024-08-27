// src/components/Pages/Discover/Discover.tsx
import React from 'react';
import CategoryList from './CategoryList/CategoryList';
import AlbumList from './AlbumList/AlbumList';
import './AlbumPage.scss';

const AlbumPage: React.FC = () => {
  return (
    <main className="album-page">
      <aside className="category-list" aria-label="Album Categories">
        <CategoryList />
      </aside>
      <section className="album-section">
        <header className="album-header">
          <h1 className="page-title">Albums</h1>
          <nav aria-label="Pagination" className="page-selector">
            {/* Page Selector Placeholder (implement pagination if needed) */}
            Page 1 of 10
          </nav>
        </header>
        <AlbumList />
      </section>
    </main>
  );
};

export default AlbumPage;
