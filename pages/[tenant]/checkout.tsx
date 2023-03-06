import Head from "next/head"
import styles from "../../styles/Checkout.module.css"
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
import CartProductItem from "../../components/cartProductItem"
import ButtonWithIcon from "../../components/ButtonWithIcon"

type Props = {
    tenant: Tenant;
    token: string | null;
    user: User | null;
    cart: CartItem[];
}

const Checkout = (data: Props) => {
    const { setToken, setUser } = useAuthContext()
    const { tenant, setTenant, shippingAddress, shippingPrice } = useAppContext()

    useEffect(() => {
        setTenant(data.tenant)
        if (data.token) setToken(data.token)
        if (data.user) setUser(data.user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formatter = useFormatter()
    const router = useRouter()
    const api = useApi(data.tenant.slug)

    // Product Control
    const [cart, setCart] = useState<CartItem[]>(data.cart)

    // Shipping
    const handleChangeAddress = () => {
        router.push(`/${data.tenant.slug}/myaddresses`);
    }

    // Payments
    const [paymentType, setPaymentType] = useState<'money' | 'card'>('money');
    const [paymentChange, setPaymentChange] = useState(0);

    // Cupom
    const [cupom, setCupom] = useState('');
    const [cupomDiscount, setCupomDiscount] = useState(0);
    const [cupomInput, setCupomInput] = useState('');
    const handleSetCupom = () => {
        if (cupomInput) {
            setCupom(cupomInput);
            setCupomDiscount(15.20);
        }
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
    const handleFinish = async () => {
        if (shippingAddress) {
            const order = await api.setOrder(
                shippingAddress,
                paymentType,
                paymentChange,
                cupom,
                data.cart,
            );
            if (order) {
                router.push(`/${data.tenant.slug}/order/${order.id}`);
            } else {
                alert('Ocorreu um erro! Tente mais tarde.');
            }
        }
    }

    return (
        <div>
            <Head>
                <title>Checkout | {tenant?.name}</title>
            </Head>

            <div className={styles.container}>
                <Header hrefBack={`/${tenant?.slug}`} color={`${tenant?.mainColor}`} title="Checkout" />

                <div className={styles.infoGroup}>
                    <div className={styles.infoArea}>
                        <div className={styles.infoTitle}>Endereço</div>
                        <div className={styles.infoBody}>
                            <ButtonWithIcon
                                color={data.tenant.mainColor}
                                leftIcon={"location"}
                                rightIcon={"arrowright"}
                                value={shippingAddress ? `${shippingAddress.street}, ${shippingAddress.number} - ${shippingAddress.neighborhood} - ${shippingAddress.city} - ${shippingAddress.state}` : 'Selecione um endereço'}
                                onClick={handleChangeAddress}
                            />
                        </div>
                    </div>
                    <div className={styles.infoArea}>
                        <div className={styles.infoTitle}>Tipo de pagamento</div>
                        <div className={styles.infoBody}>
                            <div className={styles.paymentTypes}>
                                <div className={styles.paymentBtn}>
                                    <ButtonWithIcon
                                        color={data.tenant.mainColor}
                                        value={"Dinheiro"}
                                        leftIcon="money"
                                        onClick={() => setPaymentType('money')}
                                        fill={paymentType === 'money'}
                                    />
                                </div>
                                <div className={styles.paymentBtn}>
                                    <ButtonWithIcon
                                        color={data.tenant.mainColor}
                                        value={"Cartão"}
                                        leftIcon="card"
                                        onClick={() => setPaymentType('card')}
                                        fill={paymentType === 'card'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {paymentType === 'money' &&
                        <div className={styles.infoArea}>
                            <div className={styles.infoTitle}>Troco</div>
                            <div className={styles.infoBody}>
                                <InputField
                                    color={data.tenant.mainColor}
                                    placeholder={"Troco para quanto?"}
                                    value={paymentChange ? paymentChange.toString() : ''}
                                    onChange={newValue => setPaymentChange(parseInt(newValue))}
                                />
                            </div>
                        </div>
                    }
                    <div className={styles.infoArea}>
                        <div className={styles.infoTitle}>Cupom de desconto</div>
                        <div className={styles.infoBody}>
                            {cupom &&
                                <ButtonWithIcon
                                    color={data.tenant.mainColor}
                                    value={cupom.toUpperCase()}
                                    leftIcon="cupom"
                                    rightIcon="checked"
                                />
                            }
                            {!cupom &&
                                <div className={styles.cupomInput}>
                                    <InputField
                                        color={data.tenant.mainColor}
                                        placeholder={"Tem um cupom?"}
                                        value={cupomInput}
                                        onChange={newValue => setCupomInput(newValue)}
                                    />
                                    <Button
                                        color={data.tenant.mainColor}
                                        label={"Ok"}
                                        onClick={handleSetCupom}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <div className={styles.areaQuantity}>{cart.length} {cart.length == 1 ? 'item' : 'itens'}</div>
                <div className={styles.productsList}>
                    {cart.map((item, index) => (
                        <CartProductItem key={index} color={data.tenant.mainColor} quantity={item.qt} product={item.product} onChange={() => { }} noEdit />
                    ))}
                </div>
                <div className={styles.resumeArea}>
                    <div className={styles.resumeItem}>
                        <div className={styles.resumeLeft}>Subtotal</div>
                        <div className={styles.resumeRight}>{formatter.formatPrice(subtotal)}</div>
                    </div>
                    {cupomDiscount > 0 &&
                        <div className={styles.resumeItem}>
                            <div className={styles.resumeLeft}>Desconto</div>
                            <div className={styles.resumeRight}>-{formatter.formatPrice(cupomDiscount)}</div>
                        </div>
                    }
                    <div className={styles.resumeItem}>
                        <div className={styles.resumeLeft}>Frete</div>
                        <div className={styles.resumeRight}>{shippingPrice ? formatter.formatPrice(shippingPrice) : "--"}</div>
                    </div>
                    <div className={styles.resumeLine}></div>
                    <div className={styles.resumeItem}>
                        <div className={styles.resumeLeft}>Total</div>
                        <div className={styles.resumeRightBig} style={{ color: data.tenant.mainColor }}>{formatter.formatPrice(subtotal - cupomDiscount + shippingPrice)}</div>
                    </div>
                    <div className={styles.resumeButton}>
                        <Button color={data.tenant.mainColor} label={"Finalizar Pedido"} onClick={handleFinish} fill disabled={!shippingAddress} />
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Checkout;

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