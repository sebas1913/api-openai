import Title from '@/UI/atoms/title/Title';
import styles from './navbar.module.scss';
import { Icons } from '@/UI/atoms/icons/Icons';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <Link href={'/'} className={styles.title}>
                <Title level={1}>siekGPT</Title>
            </Link>
            <div className={styles.icon}>
                <Link className={styles.link} href={'/history'}>{Icons.history}</Link>
            </div>
        </nav>
    )
}

export default Navbar;