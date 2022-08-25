import { useAppContext } from "../../contexts/app";

const Config = () => {
    const { tenant } = useAppContext()

    return (
        <div>
            Config | {tenant?.name}
        </div>
    );
}

export default Config;