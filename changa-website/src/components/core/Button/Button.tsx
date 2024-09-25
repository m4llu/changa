import React from 'react';
import './Button.scss'; // Import the SCSS file for styles

interface ButtonProps {
    variant: 'primary' | 'secondary' | 'tertiary';
    size?: 'small' | 'large'; // Optional size prop
    fullWidth?: boolean;      // Optional full-width prop
    disabled?: boolean;       // Optional disabled prop
    onClick?: () => void;     // onClick event handler
    children: React.ReactNode; // Button content
}

const Button: React.FC<ButtonProps> = ({ 
    variant, 
    size, 
    fullWidth, 
    disabled, 
    onClick, 
    children 
}) => {
    const sizeClass = size ? ` ${size}` : '';          // Apply size if provided
    const fullWidthClass = fullWidth ? ' full-width' : '';  // Apply full-width if provided
    const disabledClass = disabled ? ' disabled' : ''; // Apply disabled class if needed

    return (
        <button
            className={`button ${variant}${sizeClass}${fullWidthClass}${disabledClass}`}
            onClick={!disabled ? onClick : undefined}
            disabled={disabled} 
        >
            {children}
        </button>
    );
};

export default Button;
