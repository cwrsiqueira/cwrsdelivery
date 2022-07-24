import Head from "next/head"
import styles from "../../styles/TenantIndex.module.css"
import SearchInput from "../../components/SearchInput"
import { Banner } from "../../components/Banner"
import { ProductItem } from "../../components/ProductItem"

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

                <div className={styles.grid}>
                    {
                        function () {
                            let products = []
                            for (let i = 1; i < 16; i++) {
                                products.push(
                                    <ProductItem
                                        data={{
                                            id: i,
                                            image: '/temp/hamb.png',
                                            category: 'Tradicional',
                                            name: 'Texas Burguer',
                                            price: 'R$ 25,00'
                                        }}
                                        mainColor="#fb9400"
                                        secondColor="bisque"
                                    />
                                )
                            }
                            return products
                        }()
                    }
                </div>
            </div>
        </div>
    )
}
export default Home;