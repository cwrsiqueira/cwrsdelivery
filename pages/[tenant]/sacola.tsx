import Head from "next/head"
import styles from "../../styles/Sacola.module.css"
import Button from "../../components/Button"
import { GetServerSideProps } from "next"
import { Tenant } from "../../types/Tenant"
import { useApi } from "../../libs/useApi"
import { useAppContext } from "../../contexts/app"
import { useEffect, useState } from "react"
import { getCookie, setCookie } from "cookies-next"
import { User } from "../../types/User"
import { useAuthContext } from "../../contexts/auth"
import { Header } from "../../components/Header"
import { InputField } from "../../components/InputField"
import { useFormatter } from "../../libs/useFormatter"
import { CartItem } from "../../types/CartItem"
import { useRouter } from "next/router"
import QtControl from "../../components/QtControl"
import Image from "next/image"
import CartProductItem from "../../components/cartProductItem"
import { CartCookie } from "../../types/CartCookie"

const Home = (data: Props) => {
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

    // Product Control
    const [cart, setCart] = useState<CartItem[]>(data.cart)
    const handleChangeCount = (newCount: number, id: number) => {
        const tmpCart: CartItem[] = [...cart];
        const cartIndex = tmpCart.findIndex(item => item.product.id === id);
        if (newCount > 0) {
            tmpCart[cartIndex].qt = newCount;
        } else {
            delete tmpCart[cartIndex];
        }
        let newCart: CartItem[] = tmpCart.filter(item => item);
        setCart(newCart);

        // Update Cookie
        let cartCookie: CartCookie[] = [];
        for (let i in newCart) {
            cartCookie.push({
                id: newCart[i].product.id,
                qt: newCart[i].qt
            });
        }
        setCookie('cart', JSON.stringify(cartCookie));
    }

    // Shipping
    const [shippingInput, setShippingInput] = useState('')
    const [shippingAddress, setShippingAddress] = useState('')
    const [shippingPrice, setShippingPrice] = useState(0)
    const [shippingTime, setShippingTime] = useState(0)
    const handleShippingCalc = () => {
        setShippingAddress('Rua das Flores - Jardins da Serra - Campina Pequena')
        setShippingPrice(9.50)
        setShippingTime(20)
    }

    // Resume
    const [subtotal, setSubtotal] = useState(0)
    useEffect(() => {
        let sub = 0
        for (let i in cart) {
            sub += cart[i].product.price * cart[i].qt
        }
        setSubtotal(sub)
    }, [cart])
    const handleFinish = () => {
        router.push(`/${data.tenant.slug}/checkout`)
    }

    return (
        <div>
            <Head>
                <title>Sacola | {tenant?.name}</title>
            </Head>

            <div className={styles.container}>
                <Header hrefBack={`/${tenant?.slug}`} color={`${tenant?.mainColor}`} title="Sacola" />
                <div className={styles.areaQuantity}>{cart.length} {cart.length == 1 ? 'item' : 'itens'}</div>
                <div className={styles.productsList}>
                    {cart.map((item, index) => (
                        <CartProductItem key={index} color={data.tenant.mainColor} quantity={item.qt} product={item.product} onChange={handleChangeCount} />
                    ))}
                </div>
                <div className={styles.shippingArea}>
                    <div className={styles.shippingTitle}>Calcular frete e prazo</div>
                    <div className={styles.shippingForm}>
                        <InputField color={data.tenant.mainColor} placeholder={"12345-123"} value={shippingInput} onChange={newValue => setShippingInput(newValue)} />
                        <Button color={data.tenant.mainColor} label={"OK"} onClick={handleShippingCalc} />
                    </div>
                    {shippingTime > 0 &&
                        <div className={styles.shippingInfo}>
                            <div className={styles.shippingAddress}>{shippingAddress}</div>
                            <div className={styles.shippingTime}>
                                <div className={styles.shippingTimeText}>Receba em até {shippingTime} minutos</div>
                                <div className={styles.shippingPrice} style={{ color: data.tenant.mainColor }}>{formatter.formatPrice(shippingPrice)}</div>
                            </div>
                        </div>
                    }
                </div>
                <div className={styles.resumeArea}>
                    <div className={styles.resumeItem}>
                        <div className={styles.resumeLeft}>Subtotal</div>
                        <div className={styles.resumeRight}>{formatter.formatPrice(subtotal)}</div>
                    </div>
                    <div className={styles.resumeItem}>
                        <div className={styles.resumeLeft}>Frete</div>
                        <div className={styles.resumeRight}>{shippingPrice ? formatter.formatPrice(shippingPrice) : "--"}</div>
                    </div>
                    <div className={styles.resumeLine}></div>
                    <div className={styles.resumeItem}>
                        <div className={styles.resumeLeft}>Total</div>
                        <div className={styles.resumeRightBig} style={{ color: data.tenant.mainColor }}>{formatter.formatPrice(subtotal + shippingPrice)}</div>
                    </div>
                    <div className={styles.resumeButton}>
                        <Button color={data.tenant.mainColor} label={"Continuar"} onClick={handleFinish} fill />
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Home;

type Props = {
    tenant: Tenant;
    token: string | null;
    user: User | null;
    cart: CartItem[];
}

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

    // get cart products
    const cartCookie = getCookie('cart', context)
    const cart = await api.getCartProducts(cartCookie as string)

    return {
        props: {
            tenant,
            user,
            token,
            cart
        }
    }
}