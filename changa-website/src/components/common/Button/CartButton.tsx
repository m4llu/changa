import React from 'react';
import { FaShoppingCart } from 'react-icons/fa'; // Importing the shopping cart icon
import Button from './Button'; // Import the Button component
import { Product } from '../../../types/Product'; // Import the Product type
import './CartButton.scss'; // Import the specific SCSS file

interface ShoppingCartButtonProps {
    product: Product; // Use the Product type here
    onClick: (id: number | undefined) => void; // Include onClick prop
    variant?: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'large'; // Optional size prop
}

const MAX_ALBUM_NAME_LENGTH = 20; // Set a maximum length for album names

const truncateAlbumName = (name: string) => {
    return name.length > MAX_ALBUM_NAME_LENGTH ? name.substring(0, MAX_ALBUM_NAME_LENGTH) + '...' : name;
};

const ShoppingCartButton: React.FC<ShoppingCartButtonProps> = ({ 
    product, 
    onClick, // Get onClick from props
    variant = 'primary', // Default variant
    size = 'small', // Default size
}) => {
    return (
        <Button 
            variant={variant} 
            size={size} 
            cartButton={true}
            onClick={() => onClick(product.id)} 
        >
            <FaShoppingCart style={{ marginRight: '0.5em' }} /> {/* Shopping cart icon */}
            <div style={{ flex: '1', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' , textAlign: 'left'}}>
                <span style={{ marginRight: '0.5em'}}>
                    {truncateAlbumName(product.album)} {/* Truncated album name */}
                </span>
            </div>
            <span>${product.price.toFixed(2)}</span> {/* Displaying price */}
        </Button>
    );
};

export default ShoppingCartButton; // Exporting the ShoppingCartButton
