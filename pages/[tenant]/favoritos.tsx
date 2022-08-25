import { useAppContext } from "../../contexts/app";

const Favoritos = () => {
    const { tenant } = useAppContext()

    return (
        <div>
            Favoritos | {tenant?.name}
        </div>
    );
}

export default Favoritos;