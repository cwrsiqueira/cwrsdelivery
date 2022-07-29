import Head from "next/head"
import { GetServerSideProps } from "next"
import { Tenant } from "../../../types/Tenant"
import { useApi } from "../../../libs/useApi"
import { useAppContext } from "../../../contexts/AppContext"
import { useEffect, useState } from "react"
import { Product } from "../../../types/Product"
import styles from '../../../styles/ProductId.module.css'
import { Header } from "../../../components/Header"
import Image from "next/image"
import Button from "../../../components/Button"
import { useFormatter } from "../../../libs/useFormatter"
import QtControl from "../../../components/QtControl"

const Home = (data: Props) => {
    const { tenant, setTenant } = useAppContext()
    const [prod, setProd] = useState(data.product)
    const [qtCount, setQtCount] = useState(1)

    useEffect(() => {
        setTenant(data.tenant)
    }, [data.tenant, setTenant])

    const formatter = useFormatter()
    const handleAddBag = () => { }
    const handleChangeCount = (newCount: number) => {
        setQtCount(newCount)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>{data.product.name} | {data.tenant.name}</title>
            </Head>

            <div className={styles.header}>
                <Header
                    color={"#FFF"}
                    hrefBack={`/${data.tenant.slug}`}
                    title="Produto"
                    invert
                    like
                />
            </div>

            <div className={styles.headerBg} style={{ backgroundColor: data.tenant.mainColor }}></div>

            <div className={styles.image}>
                <Image src={data.product.image} alt="Produto" width={319} height={282} />
            </div>

            <div className={styles.category}>{data.product.category}</div>
            <div className={styles.title} style={{ borderBottomColor: data.tenant.mainColor }}>{data.product.name}</div>
            <div className={styles.line}></div>

            <div className={styles.description}>2 Blends de carne de 150g, Queijo Cheddar, Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal</div>

            <div className={styles.qtText}>Quantidade</div>

            <div className={styles.qtArea}>
                <div className={styles.qtAreaLeft}>
                    <QtControl
                        color={data.tenant.mainColor}
                        count={qtCount}
                        onUpdateCount={handleChangeCount}
                        min={1}
                        max={10}
                    />
                </div>
                <div
                    className={styles.qtAreaRight}
                    style={{ color: data.tenant.mainColor }}
                >{formatter.formatPrice(data.product.price * qtCount)}</div>
            </div>

            <div className={styles.button}>
                <Button
                    color={data.tenant.mainColor}
                    label="Adicionar à sacola"
                    onClick={handleAddBag}
                    fill
                />
            </div>


        </div >
    )
}
export default Home;

type Props = {
    tenant: Tenant,
    product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug, id } = context.query
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const api = useApi(tenantSlug as string)

    const tenant = await api.getTenant()

    if (!tenant) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    const product = await api.getProduct(id as string)

    return {
        props: {
            tenant,
            product
        }
    }
}