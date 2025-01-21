import React from 'react';
import './textarea.scss';

interface TextareaProps {
    placeholder?: string;
    className?: string;
    maxLength?: number;
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, className, maxLength, ...props }) => {
    return (
        <textarea
            className={`textarea ${className || ''}`}
            placeholder={placeholder}
            maxLength={maxLength || 150}
            {...props}
        />
    );
};

export default Textarea;
