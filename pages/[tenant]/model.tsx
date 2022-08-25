import Head from "next/head"
import { GetServerSideProps } from "next"
import { Tenant } from "../../types/Tenant"
import { useApi } from "../../libs/useApi"
import { useAppContext } from "../../contexts/app"
import { useEffect } from "react"

// Alterar arquivo Styles
import styles from "../../styles/Model.module.css"

// Alterar nome da const e seu export
const Model = (data: Props) => {
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [data.tenant, setTenant])

    return (
        <div>
            <Head>
                {/* Alterar título da página */}
                <title>Model | {data.tenant.name}</title>
            </Head>
            <div className={styles.container}>
                {/* Conteúdo da Página */}
                <h1>Model</h1>
            </div >
        </div >
    )
}
// Alterar export default para o nome da const
export default Model;

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