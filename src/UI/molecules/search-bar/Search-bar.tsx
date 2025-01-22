import React from 'react';
import Button from '@/UI/atoms/button/Button';
import Input from '@/UI/atoms/input/Input';
import styles from './searchbar.module.scss';
import { Icons } from '@/UI/atoms/icons/Icons';

interface SearchBarProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
    disabled?: boolean;
}

const SearchBar = ({ placeholder, value, onChange, onSend, disabled }: SearchBarProps) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !disabled) {
            onSend();
        }
    };

    return (
        <div className={styles.searchContainer}>
            <Input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onKeyDown={handleKeyPress}
                disabled={disabled}
            />
            <Button
                variant="primary"
                onClick={onSend}
                disabled={disabled}
            >
                {Icons.send}
            </Button>
        </div>
    );
};

export default SearchBar;