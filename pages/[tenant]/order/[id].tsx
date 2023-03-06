import Head from "next/head"
import styles from "../../../styles/Order.module.css"
import { GetServerSideProps } from "next"
import { Tenant } from "../../../types/Tenant"
import { useApi } from "../../../libs/useApi"
import { useAppContext } from "../../../contexts/app"
import { useEffect, useState } from "react"
import { getCookie, setCookie } from "cookies-next"
import { User } from "../../../types/User"
import { useAuthContext } from "../../../contexts/auth"
import { Header } from "../../../components/Header"
import { InputField } from "../../../components/InputField"
import { useFormatter } from "../../../libs/useFormatter"
import CartProductItem from "../../../components/cartProductItem"
import ButtonWithIcon from "../../../components/ButtonWithIcon"
import { Order } from "../../../types/Order"
import { useRouter } from "next/router"

type Props = {
    tenant: Tenant;
    token: string | null;
    user: User | null;
    order: Order;
}

const Order = (data: Props) => {
    const { setToken, setUser } = useAuthContext()
    const { tenant, setTenant, shippingAddress, shippingPrice } = useAppContext()

    useEffect(() => {
        setTenant(data.tenant)
        if (data.token) setToken(data.token)
        if (data.user) setUser(data.user)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formatter = useFormatter()
    const router = useRouter();

    useEffect(() => {
        if (data.order.status !== 'delivered') {
            setTimeout(() => {
                router.reload();
            }, 60000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const orderStatusList = {
        confirmation: {
            label: 'Confirmação',
            discrimination: 'Aguardando confirmação do pedido',
            backgroundColor: '#FBEFEF',
            fontColor: '#ff0011',
            pct: 1
        },
        preparing: {
            label: 'Preparando',
            discrimination: 'Preparando seu pedido',
            backgroundColor: '#fefae6',
            fontColor: '#d4bc34',
            pct: 33
        },
        sent: {
            label: 'Enviado',
            discrimination: 'Enviamos seu pedido',
            backgroundColor: '#f1f3f8',
            fontColor: '#758cbd',
            pct: 66
        },
        delivered: {
            label: 'Entregue',
            discrimination: 'Seu pedido foi entregue',
            backgroundColor: '#f1f8f6',
            fontColor: '#6ab70a',
            pct: 100
        },
    }

    return (
        <div>
            <Head>
                <title>Pedido #{`${data.order.id}`} | {tenant?.name}</title>
            </Head>

            <div className={styles.container}>
                <Header hrefBack={`/${tenant?.slug}`} color={`${tenant?.mainColor}`} title={`Pedido #${data.order.id}`} />

                {data.order.status !== 'delivered' &&
                    <div
                        className={styles.statusArea}
                        style={{ backgroundColor: orderStatusList[data.order.status].backgroundColor }}
                    >
                        <div
                            className={styles.statusLongLabel}
                            style={{ color: orderStatusList[data.order.status].fontColor }}
                        >{orderStatusList[data.order.status].discrimination}</div>
                        <div className={styles.statusPct}>
                            <div
                                className={styles.statusPctBar}
                                style={{
                                    width: `${orderStatusList[data.order.status].pct}%`,
                                    backgroundColor: orderStatusList[data.order.status].fontColor
                                }}
                            ></div>
                        </div>
                        <div className={styles.statusMsg}>Aguardando Mudança de Status...</div>
                    </div>
                }

                <div className={styles.orderInfoArea}>
                    <div className={styles.orderInfoStatus}
                        style={{
                            backgroundColor: orderStatusList[data.order.status].backgroundColor,
                            color: orderStatusList[data.order.status].fontColor
                        }}
                    >
                        {orderStatusList[data.order.status].label}
                    </div>
                    <div className={styles.orderInfoQt}>{data.order.products.length} {data.order.products.length == 1 ? 'item' : 'itens'}</div>
                    <div className={styles.orderInfoDate}>{formatter.formatDate(data.order.orderDate)}</div>
                </div>

                <div className={styles.areaQuantity}></div>
                <div className={styles.productsList}>
                    {data.order.products.map((item, index) => (
                        <CartProductItem key={index} color={data.tenant.mainColor} quantity={item.qt} product={item.product} onChange={() => { }} noEdit />
                    ))}
                </div>

                <div className={styles.infoGroup}>
                    <div className={styles.infoArea}>
                        <div className={styles.infoTitle}>Endereço</div>
                        <div className={styles.infoBody}>
                            <ButtonWithIcon
                                color={data.tenant.mainColor}
                                leftIcon={"location"}
                                rightIcon={"arrowright"}
                                value={`${data.order.shippingAddress.street}, ${data.order.shippingAddress.number} - ${data.order.shippingAddress.neighborhood} - ${data.order.shippingAddress.city} - ${data.order.shippingAddress.state}`}
                                onClick={() => { }}
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
                                        onClick={() => { }}
                                        fill={data.order.paymentType === 'money'}
                                    />
                                </div>
                                <div className={styles.paymentBtn}>
                                    <ButtonWithIcon
                                        color={data.tenant.mainColor}
                                        value={"Cartão"}
                                        leftIcon="card"
                                        onClick={() => { }}
                                        fill={data.order.paymentType === 'card'}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    {data.order.paymentType === 'money' &&
                        <div className={styles.infoArea}>
                            <div className={styles.infoTitle}>Troco</div>
                            <div className={styles.infoBody}>
                                <InputField
                                    color={data.tenant.mainColor}
                                    placeholder={"Troco para quanto?"}
                                    value={data.order.paymentChange?.toLocaleString("pt-BR", { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }) ?? ''}
                                    onChange={() => { }}
                                />
                            </div>
                        </div>
                    }

                    {data.order.cupom &&
                        <div className={styles.infoArea}>
                            <div className={styles.infoTitle}>Cupom de desconto</div>
                            <div className={styles.infoBody}>
                                <ButtonWithIcon
                                    color={data.tenant.mainColor}
                                    value={data.order.cupom.toUpperCase()}
                                    leftIcon="cupom"
                                    rightIcon="checked"
                                />
                            </div>
                        </div>
                    }
                </div>

                <div className={styles.resumeArea}>
                    <div className={styles.resumeItem}>
                        <div className={styles.resumeLeft}>Subtotal</div>
                        <div className={styles.resumeRight}>{formatter.formatPrice(data.order.subtotal)}</div>
                    </div>
                    {data.order.cupomDiscount &&
                        <div className={styles.resumeItem}>
                            <div className={styles.resumeLeft}>Desconto</div>
                            <div className={styles.resumeRight}>-{formatter.formatPrice(data.order.cupomDiscount)}</div>
                        </div>
                    }
                    <div className={styles.resumeItem}>
                        <div className={styles.resumeLeft}>Frete</div>
                        <div className={styles.resumeRight}>{data.order.shippingPrice > 0 ? formatter.formatPrice(data.order.shippingPrice) : "--"}</div>
                    </div>
                    <div className={styles.resumeLine}></div>
                    <div className={styles.resumeItem}>
                        <div className={styles.resumeLeft}>Total</div>
                        <div className={styles.resumeRightBig} style={{ color: data.tenant.mainColor }}>{formatter.formatPrice(data.order.total)}</div>
                    </div>
                </div>
            </div >
        </div >
    )
}
export default Order;

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

    // get Order
    const order = await api.getOrder(parseInt(id as string));

    return {
        props: {
            tenant,
            user,
            token,
            order
        }
    }
}