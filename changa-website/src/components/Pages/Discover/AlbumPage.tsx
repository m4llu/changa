// src/components/Pages/Discover/Discover.tsx
import React from 'react';
import './AlbumPage.scss';

const AlbumPage: React.FC = () => {
  return (
    <main className="album-page">
      <aside className="category-list" aria-label="Album Categories">

      </aside>
      <section className="album-section">
        <header className="album-header">
          <div>
            <h1 className="page-title">Albums</h1>
          </div>
          <nav aria-label="Pagination" className="page-selector">
            {/* Page Selector Placeholder (implement pagination if needed) */}
            Page 1 of 10
          </nav>
        </header>

      </section>
    </main>
  );
};

export default AlbumPage;
