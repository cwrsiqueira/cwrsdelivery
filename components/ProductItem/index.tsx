import Image from "next/image"
import Link from "next/link"
import { Product } from "../../types/Product"
import styles from "./styles.module.css"

type Props = {
    data: Product,
    mainColor: string,
    secondColor: string
}

export const ProductItem = ({ data, mainColor, secondColor }: Props) => {
    return (
        <Link href={`/test/products/${data.id}`}>
            <a className={styles.container}>
                <div className={styles.top} style={{ backgroundColor: secondColor }}></div>
                <div className={styles.info}>
                    <div className={styles.img}>
                        <Image src={data.image} alt="productImg" width={106} height={120} />
                    </div>
                    <div className={styles.category}>{data.category}</div>
                    <div className={styles.name}>{data.name}</div>
                    <div className={styles.price} style={{ color: mainColor }}>{data.price}</div>
                </div>
            </a >
        </Link>
    )
}