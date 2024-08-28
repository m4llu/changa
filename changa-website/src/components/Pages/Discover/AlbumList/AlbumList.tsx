import React, { useState, useEffect } from 'react';
import AlbumCard from './AlbumCard/AlbumCard';
import './AlbumList.scss';

interface Album {
  id: number;
  title: string;
  artist: string;
  price: number;
  imageUrl: string;
}

const AlbumList: React.FC = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbums = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_LOCAL_API_URL}/Products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': `${import.meta.env.VITE_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch albums');
        }

        const data = await response.json();

        // Assuming the API returns a list of albums with an 'id' field
        const fetchedAlbums: Album[] = data.map((item: any) => ({
          id: item.id, // Include the id
          title: item.album,
          artist: item.artist,
          price: parseFloat(item.price),
          imageUrl: item.cover || 'default/path/to/image.jpg',
        }));

        setAlbums(fetchedAlbums);
        console.log('Fetched albums:', fetchedAlbums);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  useEffect(() => {
    setFilteredAlbums(
      albums.filter((album) =>
        album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        album.artist.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, albums]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search albums..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <section className="album-list" aria-label="Album List">
        {filteredAlbums.length ? (
          filteredAlbums.map((album) => (
            <article key={album.id} className="album-item"> {/* Use id as the key */}
              <AlbumCard {...album} />
              <div className='gap'></div>
            </article>
          ))
        ) : (
          <p>No albums found</p>
        )}
      </section>
    </>
  );
};

export default AlbumList;
