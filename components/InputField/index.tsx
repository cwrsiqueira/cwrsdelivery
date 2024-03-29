import { useState } from 'react'
import styles from './styles.module.css'
import OpenEye from './openEye.svg'
import CloseEye from './closeEye.svg'

type Props = {
    color: string;
    placeholder: string;
    value: string;
    onChange: (newValue: string) => void;
    password?: boolean
    warning?: boolean
}

export const InputField = ({ color, placeholder, value, onChange, password, warning }: Props) => {
    const [showPassword, setShowPassword] = useState(false)
    const [focused, setFocused] = useState(false)

    return (
        <div
            className={styles.inputContainer}
            style={{
                borderColor: warning ? '#ff0000' : (focused ? color : '#f9f9fb'),
                backgroundColor: focused ? "#fff" : '#f9f9fb'
            }}
        >
            <input
                type={password ? (showPassword ? 'text' : 'password') : 'text'}
                className={styles.input}
                placeholder={placeholder}
                value={value}
                onChange={e => onChange(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            // maxLength={9}
            />
            {
                password &&
                <div
                    className={styles.showPassword}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword && <CloseEye />}
                    {!showPassword && <OpenEye />}
                </div>
            }
        </div >
    )
}