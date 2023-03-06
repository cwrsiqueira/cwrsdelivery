import Head from "next/head"
import styles from "../../../styles/NewAddress.module.css"
import { GetServerSideProps } from "next"
import { Tenant } from "../../../types/Tenant"
import { useApi } from "../../../libs/useApi"
import { useAppContext } from "../../../contexts/app"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import { User } from "../../../types/User"
import { useAuthContext } from "../../../contexts/auth"
import { Header } from "../../../components/Header"
import { useFormatter } from "../../../libs/useFormatter"
import { useRouter } from "next/router"
import Button from "../../../components/Button"
import { Address } from "../../../types/Address"
import { InputField } from "../../../components/InputField"

type Props = {
    tenant: Tenant;
    token: string | null;
    user: User | null;
    addresses: Address[];
}

const NewAddress = (data: Props) => {
    const { setToken, setUser } = useAuthContext()
    const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext()

    useEffect(() => {
        setTenant(data.tenant)
        if (data.token) setToken(data.token)
        if (data.user) setUser(data.user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formatter = useFormatter()
    const router = useRouter()
    const api = useApi(data.tenant.slug);

    const [cep, setCep] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [complement, setComplement] = useState('');

    const [errorFields, setErrorFields] = useState<string[]>([]);

    const verifyAddress = () => {
        let newErrorFields = [];
        let approved = true;

        if (cep.replaceAll(/[^0-9]/g, '').length !== 8) {
            newErrorFields.push('cep');
            approved = false;
        }
        if (street.length < 2) {
            newErrorFields.push('street');
            approved = false;
        }
        if (neighborhood.length < 2) {
            newErrorFields.push('neighborhood');
            approved = false;
        }
        if (city.length < 2) {
            newErrorFields.push('city');
            approved = false;
        }
        if (state.length !== 2) {
            newErrorFields.push('state');
            approved = false;
        }

        setErrorFields(newErrorFields);
        return approved;
    }

    const handleNewAddress = async () => {
        if (verifyAddress()) {
            let address: Address = { id: 0, cep, street, number, neighborhood, city, state, complement }
            let newAddress = await api.addUserAddress(address);
            if (newAddress.id > 0) {
                alert('Endereço cadastrado com sucesso!');
                console.log(newAddress);
                router.push(`/${data.tenant.slug}/myaddresses`);
            } else {
                alert('Ocorreu um erro! Tente mais tarde');
            }
        }
    }

    return (
        <div>
            <Head>
                <title>Novo Endereço | {tenant?.name}</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.header}>
                    <Header hrefBack={`/${tenant?.slug}/myaddresses`} color={`${tenant?.mainColor}`} title="Novo Endereço" />
                </div>

                <div className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className="label">CEP</div>
                            <InputField
                                color={data.tenant.mainColor}
                                placeholder={"Ex.: 00.000-000"}
                                value={cep}
                                onChange={v => setCep(v)}
                                warning={errorFields.includes('cep')}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className="label">Logradouro</div>
                            <InputField
                                color={data.tenant.mainColor}
                                placeholder={"Ex.: Rua das Flores"}
                                value={street}
                                onChange={v => setStreet(v)}
                                warning={errorFields.includes('street')}
                            />
                        </div>
                        <div className={styles.column}>
                            <div className="label">Número</div>
                            <InputField
                                color={data.tenant.mainColor}
                                placeholder={"Ex.: 123B"}
                                value={number}
                                onChange={v => setNumber(v)}
                                warning={errorFields.includes('number')}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className="label">Bairro</div>
                            <InputField
                                color={data.tenant.mainColor}
                                placeholder={"Ex.: Bairro Jardins"}
                                value={neighborhood}
                                onChange={v => setNeighborhood(v)}
                                warning={errorFields.includes('neighborhood')}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className="label">Cidade</div>
                            <InputField
                                color={data.tenant.mainColor}
                                placeholder={"Ex.: Margaridas"}
                                value={city}
                                onChange={v => setCity(v)}
                                warning={errorFields.includes('city')}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className="label">Estado</div>
                            <InputField
                                color={data.tenant.mainColor}
                                placeholder={"Ex.: Paraná"}
                                value={state}
                                onChange={v => setState(v)}
                                warning={errorFields.includes('state')}
                            />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className="label">Complemento</div>
                            <InputField
                                color={data.tenant.mainColor}
                                placeholder={"Ex.: Apto 10 Bl B"}
                                value={complement}
                                onChange={v => setComplement(v)}
                                warning={errorFields.includes('complement')}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.btnArea}>
                    <Button color={data.tenant.mainColor} label={'Adicionar'} onClick={handleNewAddress} fill />
                </div>

            </div >
        </div >
    )
}
export default NewAddress;

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
    if (!user) {
        return { redirect: { destination: 'login', permanent: false } }
    }

    // Get Logged User Addresses
    const addresses = await api.getUserAddresses(user.email);

    return {
        props: {
            tenant,
            user,
            token,
            addresses
        }
    }
}