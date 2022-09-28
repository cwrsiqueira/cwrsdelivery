import { useEffect, useState } from 'react';
import { useFormatter } from '../../libs/useFormatter';
import styles from './styles.module.css'

type Props = {
    color: string;
    count: number;
    onUpdateCount: (newCount: number) => void;
    min?: number;
    max?: number;
    size?: string;
    small?: boolean
}

const QtControl = ({ color, count, onUpdateCount, min, max, small }: Props) => {
    const [canDecrease, setCanDecrease] = useState(false)
    const [canIncrease, setCanIncrease] = useState(false)

    const format = useFormatter()

    useEffect(() => {
        setCanIncrease((!max || max && count < max) ? true : false)
        setCanDecrease((!min || min && count > min) ? true : false)
    }, [count, min, max])

    const handleIncrease = () => {
        if (canIncrease) onUpdateCount(count + 1)
    }
    const handleDecrease = () => {
        if (canDecrease) onUpdateCount(count - 1)
    }
    return (
        <div className={styles.container}>
            <div
                className={styles.button}
                onClick={handleDecrease}
                style={{
                    color: canDecrease ? "#fff" : "#96A3AB",
                    backgroundColor: canDecrease ? color : "#F2F4F5",
                    width: small ? '38px' : '48px',
                    height: small ? '38px' : '48px'
                }}
            >-</div>
            <div
                className={styles.qt}
                style={{
                    width: small ? '38px' : '48px',
                    height: small ? '38px' : '48px',
                    fontSize: small ? '14px' : '18px'

                }}
            >{format.formatNumber(count, 2)}</div>
            <div
                className={styles.button}
                onClick={handleIncrease}
                style={{
                    color: canIncrease ? "#fff" : "#96A3AB",
                    backgroundColor: canIncrease ? color : "#F2F4F5",
                    width: small ? '38px' : '48px',
                    height: small ? '38px' : '48px'
                }}
            >+</div>
        </div>
    );
}

export default QtControl;