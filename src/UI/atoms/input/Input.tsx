import styles from './input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
    placeholder?: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({placeholder, type, ...props}) => {
    return(
        <input
            className={styles.input}
            placeholder={placeholder}
            type={type}
            {...props}
        />
    )
}

export default Input;