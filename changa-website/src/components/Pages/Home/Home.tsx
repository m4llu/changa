import React, { useState, useEffect } from 'react';
import Banner from '../../features/banners/CollectionBanner/CollectionBanner';
import ProductList from '../../features/ProductList/ProductList';
import ArtistListBanner from '../../features/banners/ArtistListBanner/ArtistListBanner';
import { Product } from '../../../types/Product';

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
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
                    throw new Error('Failed to fetch products');
                }

                const data = await response.json();
                const fetchedProducts: Product[] = data.map((item: Product) => ({
                    id: item.id,
                    created: item.created,
                    album: item.album,
                    artist: item.artist,
                    price: parseFloat(item.price.toString()),
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
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="home-page">
            <Banner />
            <ArtistListBanner />
            {/* Now using ProductList directly */}
            <ProductList products={products} layout="grid" enableSearch={true} onAddToCart={console.log} />
        </div>
    );
};

export default Home;
