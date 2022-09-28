import Head from "next/head"
import styles from "../../styles/Login.module.css"
import { GetServerSideProps } from "next"
import { Tenant } from "../../types/Tenant"
import { useApi } from "../../libs/useApi"
import { useAppContext } from "../../contexts/app"
import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { InputField } from "../../components/InputField"
import Button from "../../components/Button"
import Link from "next/link"
import { useRouter } from "next/router"
import { useAuthContext } from "../../contexts/auth"

const Login = (data: Props) => {
    const { setUser, setToken } = useAuthContext()
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {
        setToken('123456')
        setUser({
            name: 'Carlos Wagner',
            email: 'cwrsiqueira@msn.com'
        })
        router.push(`/${tenant?.slug}`)
    }

    const handleSignUp = () => {
        router.push(`/${data.tenant.slug}/signup`)
    }

    return (
        <div>
            <Head>
                <title>Login | {data.tenant.name}</title>
            </Head>
            <div className={styles.container}>
                <Header
                    color={data.tenant.mainColor}
                    hrefBack={`/${data.tenant.slug}`}
                />

                <div className={styles.header}>{data.tenant.name}</div>

                <div className={styles.subtitle} style={{ borderBottomColor: data.tenant.mainColor }}>Use suas credenciais para realizar o login.</div>
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
                    <InputField
                        color={data.tenant.mainColor}
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={setPassword}
                        password={true}
                    />
                </div>
                <div className={styles.inputArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label={'Entrar'}
                        onClick={handleSubmit}
                        fill
                    />
                </div>

                <div
                    className={styles.forgetArea}
                    style={{ borderBottomColor: data.tenant.mainColor }}
                >
                    Esqueceu sua senha?
                    <Link
                        href={`/${data.tenant.slug}/forget-password`}
                    >
                        <a style={{ color: data.tenant.mainColor }}> Clique Aqui</a>
                    </Link>
                </div>
                <div className={styles.line}></div>

                <div className={styles.signUpArea}>
                    <Button
                        color={data.tenant.mainColor}
                        label={'Quero me cadastrar'}
                        onClick={handleSignUp}
                    />
                </div>

            </div >
        </div >
    )
}
export default Login

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