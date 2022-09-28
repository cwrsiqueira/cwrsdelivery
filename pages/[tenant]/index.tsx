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
import { getCookie } from "cookies-next"
import { User } from "../../types/User"
import { useAuthContext } from "../../contexts/auth"
import NoItems from '../../public/assets/images/noitems.svg'

const Home = (data: Props) => {
    const { setToken, setUser } = useAuthContext()
    const { tenant, setTenant } = useAppContext()
    const [prod, setProd] = useState<Product[]>(data.products)
    const [openMenu, setOpenMenu] = useState(false)

    const router = useRouter()

    useEffect(() => {
        setTenant(data.tenant)
        if (data.token) setToken(data.token)
        if (data.user) setUser(data.user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Search
    const [filteredList, setFilteredList] = useState<Product[]>([])
    const [searchText, setSearchText] = useState('')
    const handleSearch = (search: string) => setSearchText(search)
    useEffect(() => {
        let newFilteredList: Product[] = []
        for (let product of prod) {
            if (product.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1) {
                newFilteredList.push(product)
            }
        }
        setFilteredList(newFilteredList)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchText])


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
                        <Menu openMenu={openMenu} handleCloseMenu={handleMenu} />
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

                {searchText &&
                    <>
                        <div className={styles.searchText}>
                            Procurando por: <strong>{searchText}</strong>
                        </div>

                        {filteredList.length > 0 &&
                            <div className={styles.grid}>
                                {filteredList.map((item, index) => (
                                    <ProductItem key={index}
                                        data={item}
                                    />
                                ))}
                            </div>
                        }

                        {filteredList.length <= 0 &&
                            <div className={styles.noProducts}>
                                <NoItems color={'#E0E0E0'} />
                                <div className={styles.noProductsText}>
                                    Ops! Não há itens com este nome
                                </div>
                            </div>
                        }
                    </>
                }

                {!searchText &&
                    <>
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
                    </>
                }
            </div >
        </div >
    )
}
export default Home;

type Props = {
    tenant: Tenant;
    products: Product[];
    token: string | null;
    user: User | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const api = useApi(tenantSlug as string)

    // get tenant
    const tenant = await api.getTenant()
    if (!tenant) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    // get cookie
    // const token = context.req.cookies.token;
    const token = getCookie('token', context) || ''
    const user = await api.authorizeToken(token as string)

    // get products
    const products = await api.getProducts()

    return {
        props: {
            tenant,
            products,
            user,
            token
        }
    }
}