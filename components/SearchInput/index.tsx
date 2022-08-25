import React, { useState } from "react"
import styles from "./styles.module.css"
import SearchIcon from "./searchIcon.svg";
import { useAppContext } from "../../contexts/app";

type Props = {
    onSearch: (search: string) => void;
}

const SearchInput = ({ onSearch }: Props) => {
    const [focused, setFocused] = useState(false)
    const [search, setSearch] = useState('')
    const { tenant } = useAppContext()

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            onSearch(search)
        }
    }

    return (
        <div className={styles.container} style={{ borderColor: focused ? tenant?.mainColor : '#ffffff' }}>
            <div
                className={styles.button}
                onClick={() => onSearch(search)}
            >
                <SearchIcon color={tenant?.mainColor} />
            </div>
            <input
                type="search"
                className={styles.input}
                placeholder="Digite aqui"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyUp={handleKeyUp}
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
        </div>
    )
}
export default SearchInput;