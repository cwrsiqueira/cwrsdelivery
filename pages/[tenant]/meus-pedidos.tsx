import { useAppContext } from "../../contexts/app";

const MeusPedidos = () => {
    const { tenant } = useAppContext()

    return (
        <div>
            MeusPedidos | {tenant?.name}
        </div>
    );
}

export default MeusPedidos;