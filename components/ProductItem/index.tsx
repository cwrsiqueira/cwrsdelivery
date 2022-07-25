import Image from "next/image"
import Link from "next/link"
import { useAppContext } from "../../contexts/AppContext"
import { Product } from "../../types/Product"
import styles from "./styles.module.css"

type Props = {
    data: Product;
}

export const ProductItem = ({ data }: Props) => {
    const { tenant } = useAppContext()
    console.log(tenant)
    return (
        <Link href={`/${tenant?.slug}/products/${data.id}`}>
            <a className={styles.container}>
                <div className={styles.top} style={{ backgroundColor: tenant?.secondColor }}></div>
                <div className={styles.info}>
                    <div className={styles.img}>
                        <Image src={data.image} alt="productImg" width={106} height={120} />
                    </div>
                    <div className={styles.category}>{data.category}</div>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.price} style={{ color: tenant?.mainColor }}>{data.price}</div>
                </div>
            </a >
        </Link>
    )
}