import Title from '@/UI/atoms/title/Title';
import styles from './navbar.module.scss';
import { Icons } from '@/UI/atoms/icons/Icons';
import Link from 'next/link';
// import Image from 'next/image';

const Navbar: React.FC = () => {
    return (
        <nav className={styles.navbar}>
            <div className={styles.title}>
                {/* <Image src="/images/logo.png" width={50} height={40} alt="Logo SIEK" /> */}
                <Title level={1}>siekGPT</Title>

            </div>
            <div className={styles.icon}>
                <Link className={styles.link} href={'/history'}>{Icons.history}</Link>
            </div>
        </nav>
    )
}

export default Navbar;