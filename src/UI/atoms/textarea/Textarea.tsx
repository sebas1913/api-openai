import React from 'react';
import './textarea.scss';

interface TextareaProps {
    placeholder?: string;
    className?: string;
    maxLength?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, value, onChange, className, maxLength, ...props }) => {
    return (
        <textarea
            className={`textarea ${className || ''}`}
            placeholder={placeholder}
            maxLength={maxLength || 150}
            value={value}
            onChange={onChange}
            {...props}
        />
    );
};

export default Textarea;
