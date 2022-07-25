import styles from "./styles.module.css"
import ArrowBack from "./arrowBack.svg"
import Image from "next/image"
import Link from "next/link"

type Props = {
    hrefBack: string;
    color: string;
    title?: string;
    subtitle?: string;
}

export const Header = ({ hrefBack, color, title, subtitle }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Link href={hrefBack}>
                    <ArrowBack color={color} />
                </Link>
            </div>
            <div className={styles.center}>
                {title && <div className={styles.title}>{title}</div>}
                {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            </div>
            <div className={styles.right}></div>
        </div>
    )
}