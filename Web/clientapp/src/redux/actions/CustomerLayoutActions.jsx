import authAxiosApi from '../../axios'
import { UpdareRequestsCount } from '../reducers/CustomerLayoutReducer'
export const UpdateFriendsRequestCount=()=>async(dispatch)=>{
    await authAxiosApi.get('customer/friends/requests/count').then(r=>{
        dispatch({
            type:UpdareRequestsCount,
            payload:r
        })
    })
}