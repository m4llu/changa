// src/components/Pages/Albums/AlbumList.tsx
import React from 'react';
import AlbumCard from './AlbumCard';

const AlbumList: React.FC = () => {
  const albums = [
    { title: 'Album 1', artist: 'Artist 1', price: 9.99, imageUrl: 'path/to/image1.jpg' },
    { title: 'Album 2', artist: 'Artist 2', price: 12.99, imageUrl: 'path/to/image2.jpg' },
    // Add more albums as needed
  ];

  return (
    <section className="album-list" aria-label="Album List">
      {albums.map((album) => (
        <article key={album.title} className="album-item">
          <AlbumCard {...album} />
        </article>
      ))}
    </section>
  );
};

export default AlbumList;
