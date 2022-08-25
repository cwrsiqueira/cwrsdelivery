import Head from "next/head"
import styles from "../../styles/ForgetPassword.module.css"
import { GetServerSideProps } from "next"
import { Tenant } from "../../types/Tenant"
import { useApi } from "../../libs/useApi"
import { useAppContext } from "../../contexts/app"
import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { InputField } from "../../components/InputField"
import { useRouter } from "next/router"
import Button from "../../components/Button"

const ForgetPassword = (data: Props) => {
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [data.tenant, setTenant])

    const router = useRouter()

    const [email, setEmail] = useState('')

    const handleSubmit = () => {
        router.push(`/${data.tenant.slug}/forget-success`)
    }

    return (
        <div>
            <Head>
                <title>Esqueci a Senha | {data.tenant.name}</title>
            </Head>
            <div className={styles.container}>
                <Header
                    color={data.tenant.mainColor}
                    hrefBack={`/${data.tenant.slug}/login`}
                />

                <div className={styles.header}>{data.tenant.name}</div>

                <div className={styles.title}>Esqueceu sua senha?</div>

                <div
                    className={styles.subtitle}
                    style={{ borderBottomColor: data.tenant.mainColor }}
                >
                    Preencha o campo com seu e-mail e receba as instruções necessárias para redefinir a sua senha.
                </div>
                <div className={styles.line}></div>

                <div className={styles.inputArea}>
                    <InputField
                        color={data.tenant.mainColor}
                        placeholder="Digite seu email"
                        value={email}
                        onChange={setEmail}
                        password={false}
                    />
                </div>
                <div className={styles.inputArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label={'Enviar'}
                        onClick={handleSubmit}
                        fill
                    />
                </div>
            </div >
        </div >
    )
}
export default ForgetPassword;

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