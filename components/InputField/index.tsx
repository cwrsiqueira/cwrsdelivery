import { useState } from 'react'
import styles from './styles.module.css'
import OpenEye from './openEye.svg'
import CloseEye from './closeEye.svg'

type Props = {
    color: string;
    placeholder: string;
    value: string;
    onChange: (newValue: string) => void;
    password: boolean
}

export const InputField = ({ color, placeholder, value, onChange, password }: Props) => {
    const [input, setInput] = useState('')
    return (
        <div className={styles.container}>
            <input
                type={password ? 'password' : 'text'}
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
            />

        </div>
    )
}