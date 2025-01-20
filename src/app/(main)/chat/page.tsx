import Title from "@/UI/atoms/title/Title";
import SearchBar from "@/UI/molecules/search-bar/Search-bar";
import styles from './chat.module.scss'
import Image from "next/image";


export default function Home() {

    return (
        <div>
            <div className={styles.containerTitles}>
                <Title level={2}>¿Cómo puedo ayudarte con tu búsqueda?</Title>
                <div className={styles.logo}>
                    <Image src="/images/IA.png" alt="" width={70} height={50} />
                </div>
            </div>

            <div>
                <SearchBar
                    placeholder="Escribe tu mensaje aquí..."
                />
            </div>
        </div>
    );


}