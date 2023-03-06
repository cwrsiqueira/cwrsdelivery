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
    address: Address;
}

const EditAddress = (data: Props) => {
    const { setToken, setUser } = useAuthContext()
    const { tenant, setTenant, setShippingAddress, setShippingPrice } = useAppContext()

    useEffect(() => {
        setTenant(data.tenant)
        if (data.token) setToken(data.token)
        if (data.user) setUser(data.user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const router = useRouter()
    const api = useApi(data.tenant.slug);

    const [errorFields, setErrorFields] = useState<string[]>([]);
    const [address, setAddress] = useState<Address>(data.address);

    const verifyAddress = () => {
        let newErrorFields = [];
        let approved = true;

        if (address.cep.replaceAll(/[^0-9]/g, '').length !== 8) {
            newErrorFields.push('cep');
            approved = false;
        }
        if (address.street.length < 2) {
            newErrorFields.push('street');
            approved = false;
        }
        if (address.neighborhood.length < 2) {
            newErrorFields.push('neighborhood');
            approved = false;
        }
        if (address.city.length < 2) {
            newErrorFields.push('city');
            approved = false;
        }
        if (address.state.length !== 2) {
            newErrorFields.push('state');
            approved = false;
        }

        setErrorFields(newErrorFields);
        return approved;
    }

    const editAddressFields = (field: keyof Address, value: typeof address[keyof Address]) => {
        setAddress({ ...address, [field]: value });
    }

    const handleSaveAddress = async () => {
        if (verifyAddress()) {
            let editAddress = await api.editUserAddress(address);
            if (editAddress) {
                alert('Endereço alterado com sucesso!');
                console.log(address);
                router.push(`/${data.tenant.slug}/myaddresses`);
            } else {
                alert('Ocorreu um erro! Tente mais tarde.');
            }
        }
    }

    return (
        <div>
            <Head>
                <title>Editar Endereço | {tenant?.name}</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.header}>
                    <Header hrefBack={`/${tenant?.slug}/myaddresses`} color={`${tenant?.mainColor}`} title="Editar Endereço" />
                </div>

                <div className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className="label">CEP</div>
                            <InputField
                                color={data.tenant.mainColor}
                                placeholder={"Ex.: 00.000-000"}
                                value={address.cep}
                                onChange={v => editAddressFields('cep', v)}
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
                                value={address.street}
                                onChange={v => editAddressFields('street', v)}
                                warning={errorFields.includes('street')}
                            />
                        </div>
                        <div className={styles.column}>
                            <div className="label">Número</div>
                            <InputField
                                color={data.tenant.mainColor}
                                placeholder={"Ex.: 123B"}
                                value={address.number}
                                onChange={v => editAddressFields('number', v)}
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
                                value={address.neighborhood}
                                onChange={v => editAddressFields('neighborhood', v)}
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
                                value={address.city}
                                onChange={v => editAddressFields('city', v)}
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
                                value={address.state}
                                onChange={v => editAddressFields('state', v)}
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
                                value={address.complement ?? ''}
                                onChange={v => editAddressFields('complement', v)}
                                warning={errorFields.includes('complement')}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.btnArea}>
                    <Button color={data.tenant.mainColor} label={'Adicionar'} onClick={handleSaveAddress} fill />
                </div>

            </div >
        </div >
    )
}
export default EditAddress;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, id } = context.query
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

    // Get Address
    const address = await api.getUserAddress(parseInt(id as string));
    console.log(address);
    if (!address) {
        return { redirect: { destination: '/myaddress', permanent: false } };
    }

    return {
        props: {
            tenant,
            user,
            token,
            address
        }
    }
}