import React from 'react';
import './ProductCard.scss'; // Assuming you have some CSS for styling
import { Product } from '../../../types/Product'; // Adjust the path accordingly

interface ProductCardProps {
    product: Product; // Accept a Product object
    onAddToCart: (id: number | undefined) => void; // Adjusting onAddToCart type
    variant?: 'stack' | 'row';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, variant = 'stack' }) => {
    return (
        <div className={`product-card ${variant}`}>
            <div className="product-card__image-container">
                <img src={product.cover} alt={`${product.artist} - ${product.album}`} className="product-card__image" />
            </div>
            <div className="product-card__info">
                <h3 className="product-card__artist">{product.artist}</h3>
                <h4 className="product-card__album">{product.album}</h4>
                <p className="product-card__description">{product.description}</p>
                <p className="product-card__price">${product.price.toFixed(2)}</p>
                <p className="product-card__release-year">Released: {product.releaseYear}</p>
                <button className="product-card__button" onClick={() => onAddToCart(product.id)}>Add to Cart</button>
            </div>
        </div>
    );
};

export default ProductCard;
