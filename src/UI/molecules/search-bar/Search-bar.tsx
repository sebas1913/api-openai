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
}

const SearchBar = ({  placeholder }: SearchBarProps) => {
    return (
        <div className={styles.searchContainer}>
            <Input
                type="text"
                placeholder={placeholder}
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
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
