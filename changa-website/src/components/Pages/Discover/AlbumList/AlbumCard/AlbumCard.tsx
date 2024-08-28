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
      </figure>
      <div className="album-details">
        <div>
          <h2 className="album-title">{title}</h2>
          <p className="album-artist">{artist}</p>
        </div>
        <BuyButton onClick={console.log} price={price.toFixed(2)}/>
      </div>
    </div>
  );
};

export default AlbumCard;
