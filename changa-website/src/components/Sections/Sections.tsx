import React, { useState, useEffect } from 'react';
import Button from '../core/Button/Button';
import Input from '../core/Input/Input';
import ProductList from '../ProductList/ProductList'; // Adjust the import according to your file structure
import { Product } from '../../types/Product'; // Adjust the import for the Product interface

const Sections: React.FC = () => {
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
                
                // Assuming the API returns a list of products
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
                console.log('Fetched products:', fetchedProducts);
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
        <>
            <section style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <Button variant="primary" onClick={() => console.log('Clicked!')}>
                    Primary Button
                </Button>

                <Button variant="secondary" size="small">
                    Small Secondary Button
                </Button>

                <Button variant="tertiary" size="large" fullWidth onClick={() => alert('Large Button')}>
                    Full-Width Large Gradient Button
                </Button>

                <Button variant="primary" disabled>
                    Disabled Primary Button
                </Button>

                <Input
                    variant="default"
                    placeholder="Enter your name"
                    inputSize="small"
                    fullWidth
                    disabled
                />

                <Input
                    variant="search"
                    placeholder="Search..."
                    inputSize="large"
                    onClick={() => console.log('Search clicked')}
                />
                <div style={{width: '100%'}}>
                  <h1>Product Grid</h1>
                  <ProductList products={products} layout="grid" onAddToCart={console.log} />

                  <h1>Product List</h1>
                  <div style={{width: '70%'}}>
                  <ProductList products={products} layout="list" onAddToCart={console.log}/>

                  </div>
                </div>
            </section>
        </>
    );
};

export default Sections;
