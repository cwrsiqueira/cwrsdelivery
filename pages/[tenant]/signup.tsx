import Head from "next/head"
import styles from "../../styles/SignUp.module.css"
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

const SignUp = (data: Props) => {
    const { tenant, setTenant } = useAppContext()
    useEffect(() => {
        setTenant(data.tenant)
    }, [data.tenant, setTenant])

    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = () => {

    }

    return (
        <div>
            <Head>
                <title>Cadastro | {data.tenant.name}</title>
            </Head>
            <div className={styles.container}>
                <Header
                    color={data.tenant.mainColor}
                    hrefBack={`/${data.tenant.slug}/login`}
                />

                <div className={styles.header}>{data.tenant.name}</div>

                <div
                    className={styles.subtitle}
                    style={{ borderBottomColor: data.tenant.mainColor }}
                >
                    Preencha os campos para criar o seu cadastro.
                </div>
                <div className={styles.line}></div>

                <div className={styles.inputArea}>
                    <InputField
                        color={data.tenant.mainColor}
                        placeholder="Digite seu nome"
                        value={name}
                        onChange={setName}
                    />
                </div>
                <div className={styles.inputArea}>
                    <InputField
                        color={data.tenant.mainColor}
                        placeholder="Digite seu email"
                        value={email}
                        onChange={setEmail}
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
                        label={'Cadastrar'}
                        onClick={handleSubmit}
                        fill
                    />
                </div>

                <div
                    className={styles.forgetArea}
                    style={{ borderBottomColor: data.tenant.mainColor }}
                >
                    Já tem cadastro?
                    <Link
                        href={`/${data.tenant.slug}/login`}
                    >
                        <a style={{ color: data.tenant.mainColor }}> Fazer Login</a>
                    </Link>
                </div>

            </div >
        </div >
    )
}
export default SignUp;

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