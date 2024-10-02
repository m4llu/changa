import React from 'react';
import './Input.scss'; // Import SCSS for styling
import { FaSearch } from 'react-icons/fa';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'search';
    inputSize?: 'small' | 'large'; // Optional size prop
    fullWidth?: boolean;      // Optional full-width prop
    disabled?: boolean;       // Optional disabled prop
}

const Input: React.FC<InputProps> = ({
    variant = 'default',
    inputSize,
    fullWidth,
    disabled,
    ...props
}) => {
    const sizeClass = inputSize ? ` ${inputSize}` : '';            // Apply size if provided
    const fullWidthClass = fullWidth ? ' full-width' : ''; // Apply full-width if provided
    const disabledClass = disabled ? ' disabled' : '';   // Apply disabled if needed

    return (
        <div className={`input-container ${variant}${sizeClass}${fullWidthClass}${disabledClass}`}>
            <input 
                {...props} 
                className="input-field" 
                disabled={disabled}    // Pass disabled prop to the input element
            />
            {variant === 'search' && (
                <button type="button" className="search-button" disabled={disabled}>
                    <FaSearch />
                </button>
            )}
        </div>
    );
};

export default Input;
