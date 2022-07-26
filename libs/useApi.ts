import { CartItem } from "../types/CartItem";
import { Product } from "../types/Product";
import { User } from "../types/User";
import { Address } from "../types/Address";

const TEMP_PRODUCT: Product = {
    id: 1,
    image: '/temp/golden_burger.png',
    category: 'Tradicional',
    name: 'CWRS Spicy Bacon Burger COMBO',
    price: 26.50,
    description: '2 Blends de carne de 150g, Queijo Cheddar,Bacon Caramelizado, Salada, Molho da casa, Pão brioche artesanal'
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
    }
})