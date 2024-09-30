import React from 'react';
import './ArtistListBanner.scss';

const artistData = [
    {
        name: 'Taylor Swift',
        image: 'https://routenote.com/blog/wp-content/uploads/2024/03/1.-Taylor-Swift.jpeg',
    },
    {
        name: 'Drake',
        image: 'https://routenote.com/blog/wp-content/uploads/2023/02/2.-Drake.jpeg',
    },
    {
        name: 'Kendrick Lamar',
        image: 'https://routenote.com/blog/wp-content/uploads/2024/04/4.-Kendrick-Lamar.jpeg',
    },
    {
        name: 'Eminem',
        image: 'https://routenote.com/blog/wp-content/uploads/2023/02/8.-Eminem.jpeg',
    },
    {
        name: 'The Weeknd',
        image: 'https://routenote.com/blog/wp-content/uploads/2023/02/4.-The-Weeknd.jpeg',
    }
];

const ArtistListBanner: React.FC = () => {
    return (
        <>
        <div className="artist-list-banner-header">
            <h2 className="artist-list-banner-title">HOT RIGHT NOW</h2>
        </div>
        <div className="artist-list-banner">
            {artistData.map((artist, index) => (
                <div key={index} className="artist-image-container">
                    <img src={artist.image} alt={`Artist ${artist.name}`} className="artist-image" />
                    <div className="artist-name">{artist.name}</div>
                </div>
            ))}
        </div>
        </>
    );
};

export default ArtistListBanner;
