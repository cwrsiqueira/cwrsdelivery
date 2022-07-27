import styles from "./styles.module.css"
import ArrowBack from "./arrowBack.svg"
import Image from "next/image"
import Link from "next/link"

type Props = {
    hrefBack: string;
    color: string;
    title?: string;
    subtitle?: string;
    invert?: boolean
    like?: boolean
}

export const Header = ({ hrefBack, color, title, subtitle, invert, like }: Props) => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Link href={hrefBack}>
                    <a className={invert ? styles.btnTransparent : ''}>
                        <ArrowBack color={color} />
                    </a>
                </Link>
            </div>
            <div className={styles.center}>
                {title &&
                    <div
                        className={styles.title}
                        style={{ color: invert ? "#FFF" : '#1b1b1b' }}
                    >{title}</div>
                }
                {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
            </div>
            <div className={styles.right}>
                {like &&
                    <div className={styles.left}>
                        <a className={invert ? styles.btnTransparent : ''}>
                            <Image src={"/assets/images/heart.png"} alt="like" width={20} height={18.48} />
                        </a>
                    </div>

                }
            </div>
        </div >
    )
}