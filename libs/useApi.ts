import { Product } from "../types/Product";
import { Tenant } from "../types/Tenant";
import { User } from "../types/User";

const TEMP_PRODUCT: Product = {
    id: 1,
    image: '/temp/golden_burger.png',
    category: 'Tradicional',
    name: 'Texas Burguer',
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
    }
})