import React from 'react';
import Button from '@/UI/atoms/button/Button';
import Input from '@/UI/atoms/input/Input';
import styles from './searchbar.module.scss';
import { Icons } from '@/UI/atoms/icons/Icons';

interface SearchBarProps {
    // searchTerm: string;
    // setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    // handleSearch: () => void;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSend: () => void;
}

const SearchBar = ({  placeholder, value, onChange, onSend }: SearchBarProps) => {
    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
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
            />
            <Button
                variant="primary"
                onClick={onSend}
            >
                {Icons.send}
            </Button>
        </div>
    );
};

export default SearchBar;
