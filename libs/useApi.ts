import { Tenant } from "../types/Tenant";

export const useApi = () => ({
    getTenant: (tenantSlug: string): boolean | Tenant => {
        switch (tenantSlug) {
            case 'cwrsburger':
                return {
                    slug: 'cwrsburger',
                    name: 'CWRSBurger',
                    mainColor: '#38610B',
                    secondColor: '#ECF8E0'
                }
            case 'cwrspizza':
                return {
                    slug: 'cwrspizza',
                    name: 'CWRSPizza',
                    mainColor: '#5F4C0B',
                    secondColor: '#F7F2E0'
                }

            default:
                return false
        }
    }
})