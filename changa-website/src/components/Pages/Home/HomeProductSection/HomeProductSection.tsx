import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import for navigation
import Input from '../../../common/Input/Input';
import ProductList from '../../../features/ProductList/ProductList'; // Adjust the import according to your file structure
import { Product } from '../../../../types/Product'; // Adjust the import for the Product interface
import './HomeProductSection.scss';
import Button from '../../../common/Button/Button';

const HomeProductSection: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [visibleProducts, setVisibleProducts] = useState<Product[]>([]); // Products to display
    const navigate = useNavigate(); // Initialize useNavigate for navigation

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
                setFilteredProducts(fetchedProducts);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Update visible products based on screen width
    const updateVisibleProducts = () => {
        const windowWidth = window.innerWidth;
        let productsPerRow: number;

        // Define how many products per row based on screen width
        if (windowWidth >= 1400) {
            productsPerRow = 5;
        } else if (windowWidth >= 1200) {
            productsPerRow = 4;
        } else if (windowWidth >= 768) {
            productsPerRow = 3;
        } else {
            productsPerRow = 2;
        }

        const maxVisibleProducts = productsPerRow * 2; // Two rows of products
        setVisibleProducts(filteredProducts.slice(0, maxVisibleProducts));
    };

    // Filter products based on search term
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
        updateVisibleProducts(); // Ensure visibility is updated after filtering
    }, [searchTerm, products]);

    // Listen to window resize event and update visible products
    useEffect(() => {
        window.addEventListener('resize', updateVisibleProducts);
        updateVisibleProducts(); // Initial call to update visibility
        return () => window.removeEventListener('resize', updateVisibleProducts); // Cleanup
    }, [filteredProducts]);

    const handleNavigate = () => {
        navigate('/products'); // Navigate to the products page
    };

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <section style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <div style={{ width: '100%' }}>
                {/* Display only the filtered products that fit in 2 rows */}
                <ProductList products={visibleProducts} layout="grid" fade={true} onAddToCart={console.log} 
                footer={
                    <Button onClick={handleNavigate} variant='secondary' size='small'>
                        View All Products
                    </Button>
                }
                />
            </div>
        </section>
    );
};

export default HomeProductSection;
