import React, { useState, useEffect } from 'react';
import Input from '../../../core/Input/Input';
import ProductList from '../../../ProductList/ProductList'; // Adjust the import according to your file structure
import { Product } from '../../../../types/Product'; // Adjust the import for the Product interface
import './HomeProductSection.scss';

const HomeProductSection: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

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
                setFilteredProducts(fetchedProducts);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = products.filter(product =>
                product.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.artist.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    }, [searchTerm, products]);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            
            <div style={{ width: '100%' }}>
                <div className='product-list__header'>
                <Input
                variant="search"
                placeholder="Search by album or artist..."
                inputSize="large"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
                </div>
                <ProductList products={products} layout="grid" onAddToCart={console.log} />
            </div>
        </section>
    );
};

export default HomeProductSection;
