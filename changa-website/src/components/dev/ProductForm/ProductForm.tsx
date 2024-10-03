import React, { useRef, useState, useEffect } from 'react';
import { Product, DiscType, Category } from '../../../types/Product'; // Adjust the path as necessary
import './ProductForm.scss';

const ProductForm: React.FC = () => {
  const APIKEY = useRef(import.meta.env.VITE_API_KEY); // Your local API key
  const DISCogs_KEY = useRef(import.meta.env.VITE_DISCOGS_KEY); // Your Discogs consumer key
  const DISCogs_SECRET = useRef(import.meta.env.VITE_DISCOGS_SECRET); // Your Discogs consumer secret
  const [formData, setFormData] = useState<Product>({
    id: undefined,
    created: undefined,
    album: '',
    artist: '',
    price: 49.99,
    quantity: 50,
    discType: DiscType.CD,
    category: Category.Rock,
    recordLabel: 'Skibidi Records',
    releaseYear: 2024,
    description: 'No description available yet.',
    cover: '',
    ean: '',
    receiptProducts: [],
    couponProducts: [],
  });

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [existingAlbums, setExistingAlbums] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch existing albums from the database on component mount
  useEffect(() => {
    const fetchExistingAlbums = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_LOCAL_API_URL}/Products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': `${APIKEY.current}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch existing albums');
        }

        const data = await response.json();
        const albumNames = data.map((album: Product) => album.album.toLowerCase());
        setExistingAlbums(albumNames);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      }
    };

    fetchExistingAlbums();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Fetch album details from Discogs API (genre, release year, record label)
  const fetchDiscogsData = async (albumId: string) => {
    try {
      const response = await fetch(`https://api.discogs.com/releases/${albumId}`, {
        headers: {
          Authorization: `Discogs token=${DISCogs_KEY.current}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch from Discogs');
      }

      const data = await response.json();
      const recordLabel = data.label[0]; // Get the first label
      const releaseYear = new Date(data.released).getFullYear(); // Extract year from the release date
      const genre = data.genre.join(', '); // Join multiple genres if any

      return { recordLabel, releaseYear, genre };
    } catch (error) {
      console.error('Error fetching Discogs data:', error);
      return null;
    }
  };

  // Use MusicBrainz API to search for albums
  const searchMusicBrainz = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://musicbrainz.org/ws/2/release-group/?query=${searchQuery}&type=album&fmt=json`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch from MusicBrainz');
      }

      const data = await response.json();
      console.log('MusicBrainz data:', data);
      const albums = data['release-groups'];

      // Filter out albums that already exist in the database
      const filteredAlbums = albums.filter(
        (album: any) => !existingAlbums.includes(album.title.toLowerCase())
      );

      setSearchResults(filteredAlbums);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Get album art from Cover Art Archive (CAA) and handle album selection
  const handleSelectAlbum = async (album: any) => {
    const musicBrainzID = album.id;

    try {
      // Get cover image from Cover Art Archive
      const coverResponse = await fetch(
        `https://coverartarchive.org/release-group/${musicBrainzID}`
      );
      const coverData = await coverResponse.json();
      const coverImageUrl = coverData.images?.[0]?.image || '';

      // Fetch data from Discogs (Label, Release Year, Genre)
      const discogsData = await fetchDiscogsData(musicBrainzID);

      const newAlbum = {
        ...formData,
        album: album.title,
        artist: album['artist-credit'][0].name,
        cover: coverImageUrl,
        description: album.disambiguation || 'No description available.',
        recordLabel: discogsData?.recordLabel || 'Unknown Label',
        releaseYear: discogsData?.releaseYear || 2024,
        genre: discogsData?.genre || 'Unknown',
      };

      setFormData(newAlbum);

      // Automatically submit the selected album to the database
      const response = await fetch(`${import.meta.env.VITE_LOCAL_API_URL}/Products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': `${APIKEY.current}`,
        },
        body: JSON.stringify(newAlbum),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server response:', errorData);
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log('Product added:', data);

      // Clear the form after successful submission
      setFormData({
        id: undefined,
        created: undefined,
        album: '',
        artist: '',
        price: 49.99,
        quantity: 50,
        discType: DiscType.CD,
        category: Category.Rock,
        recordLabel: '',
        releaseYear: 2024,
        description: 'No description available yet.',
        cover: '',
        ean: '',
        receiptProducts: [],
        couponProducts: [],
      });

      // Update the existing albums list to reflect the newly added album
      setExistingAlbums([...existingAlbums, album.title.toLowerCase()]);
      setSearchResults(searchResults.filter((item) => item.id !== album.id));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'quantity' || name === 'releaseYear' ? parseInt(value, 10) : value,
      [name]: name === 'discType' || name === 'category' ? (value as any) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_LOCAL_API_URL}/Products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': `${APIKEY.current}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server response:', errorData);
        throw new Error('Something went wrong');
      }

      const data = await response.json();
      console.log('Product added:', data);

      // Clear the form after successful submission
      setFormData({
        id: undefined,
        created: undefined,
        album: '',
        artist: '',
        price: 49.99,
        quantity: 50,
        discType: DiscType.CD,
        category: Category.Rock,
        recordLabel: '',
        releaseYear: 2024,
        description: 'No description available yet.',
        cover: '',
        ean: ''
      });

    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="product-form-container">
      <h2>Add a New Product</h2>

      <div className="musicbrainz-search-container">
        <input
          type="text"
          placeholder="Search MusicBrainz for albums..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={searchMusicBrainz}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul className="musicbrainz-search-results">
        {searchResults.map((album) => (
          <li key={album.id} onClick={() => handleSelectAlbum(album)}>
            <p>{album.title} by {album['artist-credit'][0].name}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="product-form">
        <label>
          Album:
          <input
            type="text"
            name="album"
            value={formData.album}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Artist:
          <input
            type="text"
            name="artist"
            value={formData.artist}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Cover URL:
          <input
            type="text"
            name="cover"
            value={formData.cover}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Quantity:
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Disc Type:
          <select
            name="discType"
            value={formData.discType}
            onChange={handleChange}
            required
          >
            {Object.keys(DiscType).map((key) => (
              <option key={key} value={DiscType[key as keyof typeof DiscType]}>
                {key}
              </option>
            ))}
          </select>
        </label>

        <label>
          Category:
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            {Object.keys(Category).map((key) => (
              <option key={key} value={Category[key as keyof typeof Category]}>
                {Category[key as keyof typeof Category]}
              </option>
            ))}
          </select>
        </label>

        <label>
          Record Label:
          <input
            type="text"
            name="recordLabel"
            value={formData.recordLabel}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Release Year:
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default ProductForm;
