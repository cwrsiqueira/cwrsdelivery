import styles from './styles.module.css'

type Props = {
    color: string;
    label: string;
    onClick: () => void;
    fill?: boolean;
    disabled?: boolean;
}

const Button = ({ color, label, onClick, fill, disabled }: Props) => {
    return (
        <div
            className={`${styles.container} ${disabled ? styles.notAllowed : ''}`}
            style={{
                color: fill ? '#fff' : color,
                backgroundColor: fill ? color : 'transparent',
                borderColor: color,
                opacity: disabled ? .4 : 1
            }}
            onClick={disabled ? () => { } : onClick}
        >
            {label}
        </div>
    )
}
export default Button