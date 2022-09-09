import { getCookie } from "cookies-next";

const Cart = () => {
    const cart = getCookie('cart')
    return (
        <div>
            {cart}
        </div>
    );
}

export default Cart;