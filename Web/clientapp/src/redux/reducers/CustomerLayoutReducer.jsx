export const UpdareRequestsCount="UPDATE_FRIENDS_REQUESTS"
const initialStates={
    friendsRequestsCount:0
}
const CustomerLayoutReducer=(state=initialStates,action)=>{
    switch (action.type) {
        case UpdareRequestsCount:
            return {
                ...state,
                friendsRequestsCount:action.payload
            }
        default:
           return state
    }
}
export default CustomerLayoutReducer