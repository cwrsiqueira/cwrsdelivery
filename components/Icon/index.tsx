import ArrowRight from './arrowright.svg'
import Card from './card.svg'
import Checked from './checked.svg'
import Cupom from './cupom.svg'
import EmailSent from './emailSent.svg'
import Location from './location.svg'
import Money from './money.svg'
import Dots from './dots.svg'
import Edit from './edit.svg'
import Trash from './trash.svg'

type Props = {
    color: string;
    icon: string;
    width: number;
    height: number;
}

const Icon = ({ color, icon, width, height }: Props) => {
    return (
        <div style={{ width, height }}>
            {icon === 'arrowright' && <ArrowRight color={color} />}
            {icon === 'card' && <Card color={color} />}
            {icon === 'checked' && <Checked color={color} />}
            {icon === 'cupom' && <Cupom color={color} />}
            {icon === 'emailSent' && <EmailSent color={color} />}
            {icon === 'location' && <Location color={color} />}
            {icon === 'money' && <Money color={color} />}
            {icon === 'dots' && <Dots color={color} />}
            {icon === 'edit' && <Edit color={color} />}
            {icon === 'trash' && <Trash color={color} />}
        </div>
    )
}
export default Icon