import React from 'react';
import './ProductCard.scss'; // Import styles for the product card
import { Product } from '../../../types/Product'; // Import the Product type
import ShoppingCartButton from '../../core/Button/CartButton'; // Import the ShoppingCartButton

interface ProductCardProps {
    product: Product; // The product to display
    onAddToCart: (id: number | undefined) => void; // Function to handle adding to cart
    variant?: 'stack' | 'row'; // Optional variant prop
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, variant = 'stack' }) => {
    return (
        <div className={`product-card ${variant}`}>
            <div className="product-card__image-container">
                <img
                    src={product.cover}
                    alt={`${product.artist} - ${product.album}`}
                    className="product-card__image"
                />
            </div>
            <div className="product-card__info">
                <div>
                    <h3 className="product-card__artist">{product.artist}</h3>
                    <h4 className="product-card__album">{product.album}</h4>
                </div>
                <div className='product-card__bottom-container'>
                    <ShoppingCartButton 
                        product={product} 
                        onClick={() => onAddToCart(product.id)} // Handle add to cart
                        variant="primary" 
                        size="small" 
                    />
                    <p className="product-card__release-year">{product.releaseYear}</p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
