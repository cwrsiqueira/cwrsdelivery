import Head from "next/head"
import styles from "../../styles/Login.module.css"
import { GetServerSideProps } from "next"
import { Tenant } from "../../types/Tenant"
import { useApi } from "../../libs/useApi"
import { useAppContext } from "../../contexts/AppContext"
import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { InputField } from "../../components/InputField"

const Login = (data: Props) => {
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [data.tenant, setTenant])

    const [email, setEmail] = useState('')

    return (
        <div>
            <Head>
                <title>Login | {data.tenant.name}</title>
            </Head>
            <div className={styles.container}>
                <Header color={data.tenant.mainColor} hrefBack={`/${data.tenant.slug}`} />
                <InputField
                    color={data.tenant.mainColor}
                    placeholder="Digite seu email"
                    value={email}
                    onChange={setEmail}
                    password={false}
                />
            </div >
        </div >
    )
}
export default Login;

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