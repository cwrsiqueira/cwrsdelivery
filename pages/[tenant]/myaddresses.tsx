import Head from "next/head"
import styles from "../../styles/MyAddresses.module.css"
import { GetServerSideProps } from "next"
import { Tenant } from "../../types/Tenant"
import { useApi } from "../../libs/useApi"
import { useAppContext } from "../../contexts/app"
import { useEffect, useState } from "react"
import { getCookie, setCookie } from "cookies-next"
import { User } from "../../types/User"
import { useAuthContext } from "../../contexts/auth"
import { Header } from "../../components/Header"
import { useFormatter } from "../../libs/useFormatter"
import { useRouter } from "next/router"
import Button from "../../components/Button"
import { Address } from "../../types/Address"
import AddressItem from "../../components/AddressItem"

type Props = {
    tenant: Tenant;
    token: string | null;
    user: User | null;
    addresses: Address[];
}

const MyAddresses = (data: Props) => {
    const { setToken, setUser } = useAuthContext()
    const { tenant, setTenant } = useAppContext()

    useEffect(() => {
        setTenant(data.tenant)
        if (data.token) setToken(data.token)
        if (data.user) setUser(data.user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formatter = useFormatter()
    const router = useRouter()

    const handleNewAddress = () => {
        router.push(`/${data.tenant.slug}/address`);
    }

    const handleAddressSelect = (address: Address) => {
        console.log(`Selecionou o endereço: ${address.street}, ${address.number}`);
    }
    const handleAddressEdit = (id: number) => {
        console.log(`Editar o endereço id: ${id}`);
    }
    const handleAddressDelete = (id: number) => {
        console.log(`Deletar o endereço id: ${id}`);
    }

    // Menu actions
    const [openedMenu, setOpenedMenu] = useState(0);
    const handleMenuEvent = (event: MouseEvent) => {
        const tagName = (event.target as Element).tagName;
        if (!['path', 'svg'].includes(tagName)) {
            setOpenedMenu(0);
        }
    }
    useEffect(() => {
        window.removeEventListener('click', handleMenuEvent);
        window.addEventListener('click', handleMenuEvent);
        return () => window.removeEventListener('click', handleMenuEvent);
    }, [openedMenu])



    return (
        <div>
            <Head>
                <title>Meus Endereços | {tenant?.name}</title>
            </Head>

            <div className={styles.container}>
                <Header hrefBack={`/${tenant?.slug}/checkout`} color={`${tenant?.mainColor}`} title="Meus Endereços" />

                <div className={styles.list}>
                    {data.addresses.map((item, index) => (
                        <AddressItem
                            key={index}
                            color={data.tenant.mainColor}
                            address={item}
                            onSelect={handleAddressSelect}
                            onEdit={handleAddressEdit}
                            onDelete={handleAddressDelete}
                            openedMenu={openedMenu}
                            setOpenedMenu={setOpenedMenu}

                        />
                    ))}
                </div>

                <div className={styles.btnArea}>
                    <Button color={data.tenant.mainColor} label={'Novo Endereço'} onClick={handleNewAddress} fill />
                </div>

            </div >
        </div >
    )
}
export default MyAddresses;

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