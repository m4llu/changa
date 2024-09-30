// components/core/Button/CartButton.tsx
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Importing the shopping cart icon
import Button from './Button'; // Import the Button component
import { Product } from '../../../types/Product'; // Import the Product type

interface ShoppingCartButtonProps {
    product: Product; // Use the Product type here
    onClick: (id: number | undefined) => void; // Include onClick prop
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'large'; // Optional size prop
}

const ShoppingCartButton: React.FC<ShoppingCartButtonProps> = ({ 
    product, 
    onClick, // Get onClick from props
    variant = 'primary', // Default variant
    size = 'small', // Default size
}) => {
    return (
        <Button variant={variant} size={size} onClick={() => onClick(product.id)}>
            <FaShoppingCart style={{ marginRight: '0.5em' }} /> {/* Shopping cart icon */}
            {product.album} - ${product.price.toFixed(2)} {/* Displaying album name and price */}
        </Button>
    );
};

export default ShoppingCartButton;
