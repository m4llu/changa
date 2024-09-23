import React from 'react';
import './Button.scss'; // Assuming you have some CSS for styling

interface ButtonProps {
    variant: 'primary' | 'secondary' | 'tertiary';
    onClick?: () => void;
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, onClick, children }) => {
    return (
        <button className={`button ${variant}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;