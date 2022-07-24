import Head from "next/head"
import styles from "../../styles/TenantIndex.module.css"
import SearchInput from "../../components/SearchInput"
import { Banner } from "../../components/Banner"

const Home = () => {

    const handleSearch = (search: string) => {
        console.log(search)
    }

    return (
        <div>
            <Head>
                <title>Tenant</title>
            </Head>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.headerTop}>
                        <div className={styles.headerTopLeft}>
                            <div className={styles.headerTitle}>Seja Bem-Vindo 👋</div>
                        </div>
                        <div className={styles.headerTopRight}>
                            <div className={styles.menuButton}>
                                <div className={styles.menuButtonLine}></div>
                                <div className={styles.menuButtonLine}></div>
                                <div className={styles.menuButtonLine}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.headerMiddle}>
                        <div className={styles.headerSubtitle}>O que deseja para hoje?</div>
                    </div>
                    <div className={styles.headerBottom}>
                        <SearchInput
                            mainColor="#fb9400"
                            onSearch={handleSearch}
                        />
                    </div>
                </header>
                <Banner />
            </div>
        </div>
    )
}
export default Home;