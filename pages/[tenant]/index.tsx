import Head from "next/head"
import styles from "../../styles/TenantIndex.module.css"
import SearchInput from "../../components/SearchInput"
import { Banner } from "../../components/Banner"
import { ProductItem } from "../../components/ProductItem"
import { GetServerSideProps } from "next"
import { Tenant } from "../../types/Tenant"
import { useApi } from "../../libs/useApi"
import { useAppContext } from "../../contexts/AppContext"
import { useEffect } from "react"

const Home = (data: Props) => {
    const { tenant, setTenant } = useAppContext()

    useEffect(() => {
        setTenant(data.tenant)
    }, [data.tenant, setTenant])

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
                                <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
                                <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
                                <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.headerMiddle}>
                        <div className={styles.headerSubtitle}>O que deseja para hoje?</div>
                    </div>
                    <div className={styles.headerBottom}>
                        <SearchInput
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
                                    />
                                )
                            }
                            return products
                        }()
                    }
                </div>
            </div >
        </div >
    )
}
export default Home;

type Props = {
    tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const api = useApi()

    const tenant = api.getTenant(tenantSlug as string)

    if (!tenant) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            tenant
        }
    }
}