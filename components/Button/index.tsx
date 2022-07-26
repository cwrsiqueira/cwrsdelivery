import styles from './styles.module.css'

type Props = {
    color: string;
    label: string;
    onClick: () => void;
    fill?: boolean
}

const Button = ({ color, label, onClick, fill }: Props) => {
    return (
        <div
            className={styles.container}
            style={{
                color: fill ? '#fff' : color,
                backgroundColor: fill ? color : 'transparent',
                borderColor: color
            }}
            onClick={onClick}
        >
            {label}
        </div>
    )
}
export default Button