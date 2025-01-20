import { JSX } from "react";
import styles from './title.module.scss';

interface TitleProps {
    children: React.ReactNode;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}

const Title: React.FC<TitleProps> = ({ children, level }) => {
    const TitleTag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <TitleTag className={styles.title}>
            {children}
        </TitleTag>
    );
};

export default Title;
