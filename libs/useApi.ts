import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { User } from "../types/User";
import { Address } from "../types/Address";
import { Order } from "../types/Order";

const TEMP_PRODUCT: Product = {
    id: 1,
    image: '/temp/golden_burger.png',
    category: 'Tradicional',
    name: 'CWRS Spicy Bacon Burger COMBO',
    price: 26.50,
    description: '2 Blends de carne de 150g, Queijo Cheddar,Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal'
}

const TEMP_ORDER: Order = {
    id: 1,
    // status: 'confirmation',
    // status: 'preparing',
    // status: 'sent',
    status: 'delivered',
    orderDate: '2023-03-01',
    userid: 1,
    shippingAddress: {
        id: 2,
        street: 'Rua das Flores',
        number: `200`,
        cep: '58433001',
        city: 'São Paulo',
        neighborhood: 'Jardins',
        state: 'SP'
    },
    shippingPrice: 9.16,
    paymentType: 'money',
    paymentChange: 100.00,
    cupom: 'TESTE',
    cupomDiscount: 15.20,
    products: [
        { product: { ...TEMP_PRODUCT, id: 1 }, qt: 1 },
        { product: { ...TEMP_PRODUCT, id: 2 }, qt: 2 },
        { product: { ...TEMP_PRODUCT, id: 3 }, qt: 1 }
    ],
    subtotal: 106.00,
    total: 99.96,
}

export const useApi = (tenantSlug: string) => ({
    getTenant: () => {
        switch (tenantSlug) {
            case 'cwrsburger':
                return {
                    slug: 'cwrsburger',
                    name: 'CWRSBurger',
                    mainColor: 'green',
                    secondColor: '#ECF8E0'
                }
            case 'cwrspizza':
                return {
                    slug: 'cwrspizza',
                    name: 'CWRSPizza',
                    mainColor: 'orange',
                    secondColor: '#F7F2E0'
                }

            default:
                return false
        }
    },
    getProducts: async () => {
        let products = []

        for (let index = 0; index < 5; index++) {
            products.push({
                ...TEMP_PRODUCT,
                id: index + 1
            })
        }

        return products
    },
    getProduct: async (id: number) => {
        return { ...TEMP_PRODUCT, id }
    },
    authorizeToken: async (token: string): Promise<User | false> => {
        if (!token) return false;

        return {
            name: 'Carlos Wagner',
            email: 'cwrsiqueira@msn.com'
        }
    },
    getCartProducts: async (cartCookie: string) => {
        let cart: CartItem[] = []
        if (!cartCookie) return cart;

        const cartJson = JSON.parse(cartCookie)
        for (let i in cartJson) {
            if (cartJson[i].id && cartJson[i].qt) {
                const product = {
                    ...TEMP_PRODUCT,
                    id: cartJson[i].id
                }
                cart.push({
                    qt: cartJson[i].qt,
                    product
                })
            }
        }

        return cart;
    },
    getUserAddresses: async (email: string) => {
        const addresses: Address[] = [];

        for (let i = 0; i < 4; i++) {
            addresses.push(
                {
                    id: i + 1,
                    cep: '68.911-05' + i,
                    street: 'Av. Rio Bonito',
                    number: '123' + i,
                    neighborhood: 'Fazendinha',
                    city: 'Macapá',
                    state: 'AP',
                    complement: 'Conj. Fazendinha Alfaville'
                }
            );
        }

        return addresses;
    },
    addUserAddress: async (address: Address) => {
        return { ...address, id: 9 };
    },
    editUserAddress: async (address: Address) => {
        return true;
    },
    delUserAddress: async (id: number) => {
        return true;
    },
    getUserAddress: async (id: number) => {
        let address: Address = {
            id,
            cep: '68.911-05' + id,
            street: 'Av. Rio Bonito',
            number: '123' + id,
            neighborhood: 'Fazendinha',
            city: 'Macapá',
            state: 'AP',
            complement: 'Conj. Fazendinha Alfaville'

        }
        return address;
    },

    getShippingPrice: async (address: Address) => {
        return 9.16;
    },

    setOrder: async (
        address: Address,
        paymentType: 'money' | 'card',
        paymentChange: number,
        cupom: string,
        cart: CartItem[]
    ) => {
        return TEMP_ORDER;
    },
    getOrder: async (id: number) => {
        return TEMP_ORDER;
    }
})