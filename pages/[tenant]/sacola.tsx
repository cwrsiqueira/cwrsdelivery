import { useAppContext } from "../../contexts/app";

const Sacola = () => {
    const { tenant } = useAppContext()

    return (
        <div>
            Sacola | {tenant?.name}
        </div>
    );
}

export default Sacola;