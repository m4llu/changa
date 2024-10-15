import React, { useState, useEffect } from 'react';
import './AlbumPage.scss';
import useStickyNav from '../../../hooks/useStickyNav';
import ProductList from '../../features/ProductList/ProductList'; // Import the ProductList component
import { Product } from '../../../types/Product';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

const AlbumPage: React.FC = () => {
  useStickyNav(true);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`${import.meta.env.VITE_LOCAL_DEBUG_API_URL}/Products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': `${import.meta.env.VITE_API_KEY}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();

        const fetchedProducts: Product[] = data.map((item: any) => ({
          id: item.id,
          created: item.created,
          album: item.album,
          artist: item.artist,
          price: parseFloat(item.price),
          quantity: item.quantity,
          discType: item.discType,
          category: item.category,
          recordLabel: item.recordLabel,
          releaseYear: item.releaseYear,
          description: item.description,
          cover: item.cover || 'default/path/to/image.jpg',
          ean: item.ean,
        }));

        setProducts(fetchedProducts);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main className="album-page">
      {/* Category Sidebar */}
      <aside className="category-list" aria-label="Album Categories">
        <ul className="category-list__items">
          <li className="category-list__item">Rock</li>
          <li className="category-list__item">Pop</li>
          <li className="category-list__item">Jazz</li>
          <li className="category-list__item">Classical</li>
          <li className="category-list__item">Hip-Hop</li>
            <li className="category-list__item">Electronic</li>
            <li className="category-list__item">Reggae</li>
            <li className="category-list__item">Blues</li>
            <li className="category-list__item">Country</li>
            <li className="category-list__item">R&B</li>
        </ul>
      </aside>

      {/* Album Section */}
      <section className="album-section">
        <header className="album-header">
          <h1>Albums</h1>
          <Input variant='search' placeholder="Search albums" />
        </header>

        {/* Products Grid */}
        <div className="album-grid">
          <ProductList products={products} onAddToCart={console.log} />
        </div>

        {/* Pagination */}
        <nav aria-label="Pagination" className="page-selector">
        <Button variant="secondary">Previous</Button>
          <span>Page 1 of 10</span>
          <Button variant="secondary">Next</Button>
        </nav>
      </section>
    </main>
  );
};

export default AlbumPage;
