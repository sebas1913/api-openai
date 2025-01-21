import React from 'react';
import Button from '@/UI/atoms/button/Button';
import Textarea from '@/UI/atoms/textarea/Textarea';
import styles from './searchbar.module.scss';
import { Icons } from '@/UI/atoms/icons/Icons';

interface SearchBarProps {
    // searchTerm: string;
    // setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    // handleSearch: () => void;
    placeholder: string;
}

const SearchBar = ({  placeholder }: SearchBarProps) => {
    return (
        <div className={styles.searchContainer}>
            <Textarea
                placeholder={placeholder}
                maxLength={255}
            />
            <Button
                variant="primary"
                // onClick={handleSearch}
            >
                {Icons.send}
            </Button>
        </div>
    );
};

export default SearchBar;
