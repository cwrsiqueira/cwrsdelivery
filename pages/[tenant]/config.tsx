import { useAppContext } from "../../contexts/AppContext";

const Config = () => {
    const { tenant } = useAppContext()

    return (
        <div>
            Config | {tenant?.name}
        </div>
    );
}

export default Config;