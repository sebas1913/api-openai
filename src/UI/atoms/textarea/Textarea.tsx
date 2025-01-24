import React from 'react';
import './textarea.scss';

interface TextareaProps {
    disabled?: boolean;
    placeholder?: string;
    className?: string;
    maxLength?: number;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onEnterPress?: () => void; 
}

const Textarea: React.FC<TextareaProps> = ({ placeholder, value, onChange, className, maxLength, onEnterPress, ...props }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (onEnterPress) onEnterPress();
        }
    };

    return (
        <textarea
            className={`textarea ${className || ''}`}
            placeholder={placeholder}
            maxLength={maxLength || 150}
            value={value}
            onChange={onChange}
            onKeyDown={handleKeyDown}
            {...props}
        />
    );
};

export default Textarea;
