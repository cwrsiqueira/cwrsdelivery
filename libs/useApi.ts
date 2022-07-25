export type getTenantResponse = {
    name: string;
    mainColor: string;
    secondColor: string;
}

export const useApi = () => ({
    getTenant: (tenantSlug: string): boolean | getTenantResponse => {
        switch (tenantSlug) {
            case 'CWRSBurger':
                return {
                    name: 'CWRSBurger',
                    mainColor: '#DF013A',
                    secondColor: '#F8E0E6'
                }
            case 'CWRSPizza':
                return {
                    name: 'CWRSPizza',
                    mainColor: '#0101DF',
                    secondColor: '#E0E0F8'
                }

            default:
                return false
        }
    }
})