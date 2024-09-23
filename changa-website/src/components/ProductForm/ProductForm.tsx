import React, { useRef, useState, useEffect } from 'react';
import { Product, DiscType, Category } from '../../types/Product'; // Adjust the path as necessary
import './ProductForm.scss';

const ProductForm: React.FC = () => {
  const APIKEY = useRef(import.meta.env.VITE_API_KEY);
  const LASTFM_API_KEY = useRef(import.meta.env.VITE_LASTFM_API_KEY); // Last.fm API Key
  const [formData, setFormData] = useState<Product>({
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
        const albumNames = data.map((album: any) => album.album.toLowerCase());
        setExistingAlbums(albumNames);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchExistingAlbums();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const searchLastFM = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=album.search&album=${searchQuery}&api_key=${LASTFM_API_KEY.current}&format=json`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch from Last.fm');
      }

      const data = await response.json();
      const albums = data.results.albummatches.album;

      // Filter out albums that already exist in the database
      const filteredAlbums = albums.filter(
        (album: any) => !existingAlbums.includes(album.name.toLowerCase())
      );

      setSearchResults(filteredAlbums);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAlbum = async (album: any) => {
    const imageUrl = album.image?.find((img: any) => img.size === 'large')?.['#text'] || ''; // Get the large image

    const newAlbum = {
      ...formData,
      album: album.name,
      artist: album.artist,
      cover: imageUrl,
      description: album.url,
    };

    setFormData(newAlbum);

    // Automatically submit the selected album to the database
    try {
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
      });

      // Update the existing albums list to reflect the newly added album
      setExistingAlbums([...existingAlbums, album.name.toLowerCase()]);
      setSearchResults(searchResults.filter((item) => item.name !== album.name));
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

      <div className="lastfm-search-container">
        <input
          type="text"
          placeholder="Search Last.fm for albums..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={searchLastFM}>Search</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <ul className="lastfm-search-results">
        {searchResults.map((album) => (
          <li key={album.url} onClick={() => handleSelectAlbum(album)}>
            <img src={album.image?.find((img: any) => img.size === 'small')?.['#text']} alt={album.name} />
            <p>{album.name} by {album.artist}</p>
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
