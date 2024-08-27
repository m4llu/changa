// src/components/Pages/Albums/AlbumCard.tsx
import React from 'react';
import BuyButton from './BuyButton';

interface AlbumCardProps {
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
}

const AlbumCard: React.FC<AlbumCardProps> = ({ title, artist, price, imageUrl }) => {
  return (
    <div className="album-card">
      <figure className="album-image-wrapper">
        <img src={imageUrl} alt={`${title} cover`} className="album-image" />
        <figcaption className="sr-only">{title} by {artist}</figcaption>
      </figure>
      <div className="album-details">
        <div>
          <h2 className="album-title">{title}</h2>
          <p className="album-artist">{artist}</p>
          <p className="album-price">${price.toFixed(2)}</p>
        </div>
        <BuyButton onClick={console.log}/>
      </div>
    </div>
  );
};

export default AlbumCard;
