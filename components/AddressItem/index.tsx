import { Address } from '../../types/Address';
import Icon from '../Icon';
import styles from './styles.module.css';

type Props = {
    color: string;
    address: Address;
    onSelect: (address: Address) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    openedMenu: number;
    setOpenedMenu: (id: number) => void;
}

const AddressItem = ({ color, address, onSelect, onEdit, onDelete, openedMenu, setOpenedMenu }: Props) => {
    const handleSetOpenedMenu = () => {
        if (address.id == openedMenu) {
            setOpenedMenu(0);
        } else {
            setOpenedMenu(address.id)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.addressArea} onClick={() => onSelect(address)}>
                <div className={styles.addressAreaIcon}>
                    <Icon color={color} icon='location' width={24} height={24} />
                </div>
                <div className={styles.addressAreaText}>
                    {`${address.street}, ${address.number} - ${address.city}-${address.state}`}
                </div>
            </div>
            <div className={styles.menuArea}>
                <div className={styles.menuAreaIcon} onClick={handleSetOpenedMenu} id="menuAreaIcon">
                    <Icon color='#6A7D8B' icon='dots' width={24} height={24} />
                </div>
                {openedMenu == address.id &&
                    <div className={styles.menuAreaActions}>
                        <div className={styles.menuAreaActionsItem} onClick={() => onEdit(address.id)}>
                            <div className={styles.menuAreaActionsItemIcon}>
                                <Icon color='#96A3AB' icon='edit' width={20} height={20} />
                            </div>
                            <div className={styles.menuAreaActionsItemTitle}>Editar</div>
                        </div>
                        <div className={styles.menuAreaActionsItem} onClick={() => onDelete(address.id)}>
                            <div className={styles.menuAreaActionsItemIcon}>
                                <Icon color='#96A3AB' icon='trash' width={20} height={20} />
                            </div>
                            <div className={styles.menuAreaActionsItemTitle}>Deletar</div>
                        </div>
                    </div>
                }
            </div>
        </div >
    );
}

export default AddressItem;