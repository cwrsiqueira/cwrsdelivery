import Head from "next/head"
import styles from "../../styles/TenantIndex.module.css"
import SearchInput from "../../components/SearchInput"
import { Banner } from "../../components/Banner"
import { ProductItem } from "../../components/ProductItem"
import { GetServerSideProps } from "next"
import { Tenant } from "../../types/Tenant"
import { useApi } from "../../libs/useApi"
import { useAppContext } from "../../contexts/app"
import { useEffect, useState } from "react"
import { Product } from "../../types/Product"
import { useRouter } from "next/router"
import Menu from "../../components/Menu"

const Home = (data: Props) => {
    const { tenant, setTenant } = useAppContext()
    const [prod, setProd] = useState(data.products)
    const [openMenu, setOpenMenu] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setTenant(data.tenant)
    })

    const handleSearch = (search: string) => {
        console.log(search)
    }

    const handleMenu = () => {
        setOpenMenu(!openMenu)
    }

    return (
        <div>
            <Head>
                <title>{tenant?.name}</title>
            </Head>
            <div className={styles.container}>
                <header className={styles.header}>
                    <div className={styles.headerTop}>
                        <div className={styles.headerTopLeft}>
                            <div className={styles.headerTitle}>Seja Bem-Vindo 👋</div>
                        </div>
                        <div className={styles.headerTopRight}>
                            <button className={styles.menuButton} onClick={handleMenu}>
                                <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
                                <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
                                <div className={styles.menuButtonLine} style={{ backgroundColor: tenant?.mainColor }}></div>
                            </button>
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
                    {data.products &&
                        prod.map((item, index) => (
                            <ProductItem key={index}
                                data={item}
                            />
                        ))
                    }
                </div>
            </div >
            <Menu openMenu={openMenu} handleCloseMenu={handleMenu} />
        </div >
    )
}
export default Home;

type Props = {
    tenant: Tenant,
    products: Product[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const api = useApi(tenantSlug as string)

    const tenant = await api.getTenant()

    if (!tenant) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const products = await api.getProducts()

    return {
        props: {
            tenant,
            products
        }
    }
}