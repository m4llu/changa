import React from 'react';

interface BuyButtonProps {
    onClick: () => void;
}

const BuyButton: React.FC<BuyButtonProps> = ({ onClick }) => {
    return (
        <div className='buy-button'>
        <p>LP</p>
        <p>69.99€</p>
        <button onClick={onClick}>
            Buy
        </button>
        </div>
    );
};

export default BuyButton;