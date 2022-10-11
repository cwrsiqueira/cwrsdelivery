import Image from 'next/image';
import { useFormatter } from '../../libs/useFormatter';
import { Product } from '../../types/Product';
import QtControl from '../QtControl';
import styles from './styles.module.css';

type Props = {
    color: string;
    quantity: number;
    product: Product;
    onChange: (newCount: number, id: number) => void;
    noEdit?: boolean;
}

const CartProductItem = ({ color, quantity, product, onChange, noEdit }: Props) => {
    const formatter = useFormatter();

    return (
        <div className={styles.areaItem}>
            <div className={styles.areaItemImg}>
                <Image src={product.image} alt="productImage" width={40} height={40} />
            </div>
            <div className={styles.areaItemInfo}>
                <div className={styles.areaItemInfoCategory}>{product.category}</div>
                <div className={styles.areaItemInfoTitle}>{product.name}</div>
                <div className={styles.areaItemInfoPrice} style={{ color: color }}>{formatter.formatPrice(product.price)}</div>
            </div>
            <div className={styles.areaQtControl}>
                {noEdit &&
                    <div className={styles.qtArea}>
                        <div className={styles.qtTitle} style={{ color }}>Qnt.</div>
                        <div className={styles.qtCount} style={{ color }}>{quantity}</div>
                    </div>
                }
                {!noEdit &&
                    <QtControl
                        color={color}
                        count={quantity}
                        onUpdateCount={(newCount: number) => onChange(newCount, product.id)}
                        min={0}
                        small
                    />
                }
            </div>
        </div>
    );
}

export default CartProductItem;