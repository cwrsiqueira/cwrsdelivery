import EmailSent from './emailSent.svg'

type Props = {
    color: string;
    icon: string;
    width: number;
    height: number;
}

const Icon = ({ color, icon, width, height }: Props) => {
    return (
        <div style={{ width, height }}>
            {icon === 'emailSent' && <EmailSent color={color} />}
        </div>
    )
}
export default Icon