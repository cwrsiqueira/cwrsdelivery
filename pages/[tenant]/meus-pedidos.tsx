import { useAppContext } from "../../contexts/AppContext";

const MeusPedidos = () => {
    const { tenant } = useAppContext()

    return (
        <div>
            MeusPedidos | {tenant?.name}
        </div>
    );
}

export default MeusPedidos;