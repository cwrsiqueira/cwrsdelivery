import { useAppContext } from "../../contexts/AppContext";

const Favoritos = () => {
    const { tenant } = useAppContext()

    return (
        <div>
            Favoritos | {tenant?.name}
        </div>
    );
}

export default Favoritos;