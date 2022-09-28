import Head from "next/head"
import styles from "../../styles/Model.module.css"
import { GetServerSideProps } from "next"
import { Tenant } from "../../types/Tenant"
import { useApi } from "../../libs/useApi"
import { useAppContext } from "../../contexts/app"
import { useEffect } from "react"
import { getCookie } from "cookies-next"
import { User } from "../../types/User"
import { useAuthContext } from "../../contexts/auth"
import { Header } from "../../components/Header"

const Model = (data: Props) => {
    const { setToken, setUser } = useAuthContext()
    const { tenant, setTenant } = useAppContext()

    useEffect(() => {
        setTenant(data.tenant)
        if (data.token) setToken(data.token)
        if (data.user) setUser(data.user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <Head>
                <title>Model | {tenant?.name}</title>
            </Head>

            <div className={styles.container}>
                <Header hrefBack={`/${tenant?.slug}`} color={`${tenant?.mainColor}`} title="Model" />

            </div >
        </div >
    )
}
export default Model;

type Props = {
    tenant: Tenant;
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

    return {
        props: {
            tenant,
            user,
            token,
        }
    }
}