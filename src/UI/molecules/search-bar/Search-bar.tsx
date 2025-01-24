import React from 'react';
import Button from '@/UI/atoms/button/Button';
import Textarea from '@/UI/atoms/textarea/Textarea';
import styles from './searchbar.module.scss';
import { Icons } from '@/UI/atoms/icons/Icons';

interface SearchBarProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onSend: () => void;
    disabled?: boolean;
}

const SearchBar = ({ placeholder, value, onChange, onSend, disabled }: SearchBarProps) => {
    return (
        <div className={styles.searchContainer}>
            <Textarea
                placeholder={placeholder}
                maxLength={255}
                value={value}
                onChange={onChange}
                onEnterPress={onSend}
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