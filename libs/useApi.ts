import { Tenant } from "../types/Tenant";

export const useApi = () => ({
    getTenant: (tenantSlug: string): boolean | Tenant => {
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
    }
})