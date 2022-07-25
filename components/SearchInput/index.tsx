import React, { useState } from "react"
import styles from "./styles.module.css"
import SearchIcon from "./searchIcon.svg";

type Props = {
    mainColor: string;
    onSearch: (search: string) => void;
}

const SearchInput = ({ mainColor, onSearch }: Props) => {
    const [focused, setFocused] = useState(false)
    const [search, setSearch] = useState('')

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.code === 'Enter') {
            onSearch(search)
        }
    }

    return (
        <div className={styles.container} style={{ borderColor: focused ? mainColor : '#ffffff' }}>
            <div
                className={styles.button}
                onClick={() => onSearch(search)}
            >
                <SearchIcon color={mainColor} />
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