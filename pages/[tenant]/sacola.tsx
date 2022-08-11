import { useAppContext } from "../../contexts/AppContext";

const Sacola = () => {
    const { tenant } = useAppContext()

    return (
        <div>
            Sacola | {tenant?.name}
        </div>
    );
}

export default Sacola;