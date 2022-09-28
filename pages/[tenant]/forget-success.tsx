import Head from "next/head"
import styles from "../../styles/ForgetSuccess.module.css"
import { GetServerSideProps } from "next"
import { Tenant } from "../../types/Tenant"
import { useApi } from "../../libs/useApi"
import { useAppContext } from "../../contexts/app"
import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { InputField } from "../../components/InputField"
import { useRouter } from "next/router"
import Button from "../../components/Button"
import Icon from "../../components/Icon"

const ForgetSuccess = (data: Props) => {
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const router = useRouter()

    const handleSubmit = () => {
        router.push(`/${data.tenant.slug}/login`)
    }

    return (
        <div>
            <Head>
                <title>Verifique seu Email | {data.tenant.name}</title>
            </Head>
            <div className={styles.container}>
                <Header
                    color={data.tenant.mainColor}
                    hrefBack={`/${data.tenant.slug}/forget-password`}
                />

                <div className={styles.icon}>
                    <Icon color={data.tenant.mainColor} icon='emailSent' width={100} height={82} />
                </div>

                <div className={styles.title}>Verifique seu e-mail</div>

                <div
                    className={styles.subtitle}
                >
                    Enviamos as instruções para recuperação de senha para o seu e-mail.
                </div>
                <div className={styles.inputArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label={'Fazer Login'}
                        onClick={handleSubmit}
                        fill
                    />
                </div>
            </div >
        </div >
    )
}
export default ForgetSuccess;

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