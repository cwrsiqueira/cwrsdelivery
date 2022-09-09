import { useState } from 'react';
import { useAppContext } from '../../contexts/app';
import styles from './Menu.module.css'
import CloseIcon from './CloseIcon.svg'
import Button from '../Button'
import { useRouter } from 'next/router';
import Link from 'next/link';
import Cardapio from './cardapio.svg'
import Config from './config.svg'
import Favoritos from './favoritos.svg'
import Pedidos from './pedidos.svg'
import Sacola from './sacola.svg'
import Sair from './sair.svg'
import { useAuthContext } from '../../contexts/auth';

type Props = {
    openMenu: boolean
    handleCloseMenu: () => void
}

const Menu = ({ openMenu, handleCloseMenu }: Props) => {
    const { tenant } = useAppContext()
    const { user, setToken } = useAuthContext()

    const router = useRouter()

    const handleLogin = () => {
        router.push(`/${tenant?.slug}/login`)
    }

    const handleLogout = () => {
        setToken('')
        handleCloseMenu()

    }

    return (
        <div className={`${styles.container} ${openMenu ? styles.active : ''}`}>
            <div className={styles.header}>
                <div className={styles.header_right} style={{ borderBottomColor: tenant?.mainColor }}>

                    {user &&
                        <>
                            <div className={styles.title}>Carlos Wagner</div>
                            <div className={styles.subtitle}>Ultimo pedido há 2 semanas</div>
                        </>
                    }
                    {!user &&
                        <div className={styles.inputArea}>
                            <Button color={tenant?.mainColor as string} label={'Fazer Login'} onClick={handleLogin} fill />
                        </div>
                    }
                </div>
                <div className={styles.header_left} onClick={handleCloseMenu}>
                    <CloseIcon style={{ color: tenant?.mainColor }} />
                </div>
            </div>
            <div className={styles.line}></div>

            <div className={styles.body}>
                <Link href={`/${tenant?.slug}/`}>
                    <a className={styles.area_menu_title}>
                        <div className={styles.icon}><Cardapio /></div>
                        <div className={styles.menu_title}>Cardápio</div>
                    </a>
                </Link>
                <Link href={`/${tenant?.slug}/sacola`}>
                    <a className={styles.area_menu_title}>
                        <div className={styles.icon}><Sacola /></div>
                        <div className={styles.menu_title}>Sacola</div>
                    </a>
                </Link>
                <Link href={`/${tenant?.slug}/favoritos`}>
                    <a className={styles.area_menu_title}>
                        <div className={styles.icon}><Favoritos /></div>
                        <div className={styles.menu_title}>Favoritos</div>
                    </a>
                </Link>
                <Link href={`/${tenant?.slug}/meus-pedidos`}>
                    <a className={styles.area_menu_title}>
                        <div className={styles.icon}><Pedidos /></div>
                        <div className={styles.menu_title}>Meus Pedidos</div>
                    </a>
                </Link>
                <Link href={`/${tenant?.slug}/config`}>
                    <a className={styles.area_menu_title}>
                        <div className={styles.icon}><Config /></div>
                        <div className={styles.menu_title}>Configurações</div>
                    </a>
                </Link>
            </div>

            {user &&
                <div className={styles.footer}>
                    <div className={styles.icon}><Sair /></div>
                    <div className={styles.menu_title} onClick={handleLogout}>Sair</div>
                </div>
            }
        </div>
    );
}

export default Menu;