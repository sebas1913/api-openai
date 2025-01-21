import { JSX } from "react";

interface TitleProps {
    children: React.ReactNode;
    level: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
}

const Title: React.FC<TitleProps> = ({ children, level, className }) => {
    const TitleTag = `h${level}` as keyof JSX.IntrinsicElements;

    return (
        <TitleTag className={className}>
            {children}
        </TitleTag>
    );
};

export default Title;
