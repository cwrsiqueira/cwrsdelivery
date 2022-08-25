import { Tenant } from '../../types/Tenant';
import { useContext } from 'react';
import { Actions } from './types';
import { AppContext } from './index'

export const useAppContext = () => {
    const { state, dispatch } = useContext(AppContext)

    return {
        ...state,
        setTenant: (tenant: Tenant) => {
            dispatch({
                type: Actions.SET_TENANT,
                payload: { tenant }
            })
        }
    }
}