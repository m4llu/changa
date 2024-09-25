import React from 'react';
import './ProductList.scss';
import ProductCard from './ProductCard/ProductCard'; // Assuming ProductCard is in the same directory
import { Product } from '../../types/Product'; // Adjust the path accordingly

interface ProductListProps {
    products: Product[];
    layout?: 'grid' | 'list'; // Choose between grid or list layout
    onAddToCart: (id: number | undefined) => void; // Adjusting onAddToCart type
}

const ProductList: React.FC<ProductListProps> = ({ products, layout = 'grid', onAddToCart }) => {
    return (
        <div className={`product-list ${layout}`}>
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    product={product} // Passing the entire product object
                    onAddToCart={onAddToCart}
                    variant={layout === 'grid' ? 'stack' : 'row'} // Stack for grid, row for list
                />
            ))}
        </div>
    );
};

export default ProductList;
