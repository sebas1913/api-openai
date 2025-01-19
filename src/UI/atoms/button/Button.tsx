import styles from './button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    variant: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<ButtonProps> = ({ variant, children, ...props }) => {
    const buttonClassName = `${styles.button} ${styles[variant]}`;

    return(
        <button className={buttonClassName} {...props}>
            {children}
        </button>
    )
}

export default Button;