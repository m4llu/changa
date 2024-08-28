import React from 'react';

interface BuyButtonProps {
    onClick: () => void;
    price: string;
}

const BuyButton: React.FC<BuyButtonProps> = ({ onClick, price }) => {
    return (
        <div className='buy-button'>
        <p>LP</p>
        <p>{price}€</p>
        <button onClick={onClick}>
            Buy
        </button>
        </div>
    );
};

export default BuyButton;