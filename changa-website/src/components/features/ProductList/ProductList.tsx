import React, { useState, useEffect } from 'react';
import './ProductList.scss';
import ProductCard from './ProductCard/ProductCard';
import Input from '../../common/Input/Input'; // Reuse the Input component for search functionality
import { Product } from '../../../types/Product';

interface ProductListProps {
    products: Product[]; // List of products passed from parent
    layout?: 'grid' | 'list'; // Option to display as grid or list
    enableSearch?: boolean; // Optional search functionality
    onAddToCart: (id: number | undefined) => void; // Function to handle add to cart action
    header?: JSX.Element; // Optional header JSX element
    footer?: JSX.Element; // Optional footer JSX element
    fade?: boolean; // Optional fade effect
}

const ProductList: React.FC<ProductListProps> = ({ products, layout = 'grid', enableSearch = false, onAddToCart, header, footer, fade }) => {
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [searchTerm, setSearchTerm] = useState<string>('');

    // Handle search/filter logic
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

    return (
        <div className="product-list-wrapper">
            {header && <div className="product-list__custom-header">{header}</div>} {/* Custom header */}
            
            {enableSearch && (
                <div className="product-list__header">
                    <Input
                        variant="search"
                        placeholder="Search by album or artist..."
                        inputSize="large"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            )}

            <div className={`product-list ${layout}`}>
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                            variant={layout === 'grid' ? 'stack' : 'row'}
                        />
                    ))
                ) : (
                    <p>No products found.</p>
                )}
            </div>
            {fade && <div className="product-list__fade-shadow"></div>} {/* Fade shadow */}
            {footer && <div className="product-list__custom-footer">{footer}</div>} {/* Custom footer */}
        </div>
    );
};

export default ProductList;
