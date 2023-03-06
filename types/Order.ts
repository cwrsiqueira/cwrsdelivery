import { Address } from "./Address";
import { CartItem } from "./CartItem";

export type Order = {
    id: number;
    status: 'confirmation' | 'preparing' | 'sent' | 'delivered';
    orderDate: string;
    userid: number;
    shippingAddress: Address;
    shippingPrice: number;
    paymentType: 'money' | 'card';
    paymentChange?: number;
    cupom?: string;
    cupomDiscount?: number;
    products: CartItem[];
    subtotal: number;
    total: number;
}