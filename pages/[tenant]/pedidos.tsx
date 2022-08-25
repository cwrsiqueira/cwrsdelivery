import { GetServerSideProps } from "next"
import Head from "next/head"
import { useEffect } from "react"
import { useAppContext } from "../../contexts/app"
import { useApi } from "../../libs/useApi"
import { Tenant } from "../../types/Tenant"

const Pedidos = (data: Props) => {
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [data.tenant, setTenant])

    return (
        <div>
            <Head>
                <title>Pedidos | {data.tenant.name}</title>
            </Head>
            <h1>Tenant - Pedidos</h1>
        </div>
    )
}
export default Pedidos;

type Props = {
    tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const api = useApi(tenantSlug as string)

    const tenant = api.getTenant()

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