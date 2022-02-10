import { applyMiddleware, compose, createStore } from "redux";
import thunk from 'redux-thunk'
import {Reducers} from "./reducers";
const initialState = {}
const middlewares = [thunk]
let devtools = (x) => x
if (
    process.env.NODE_ENV !== 'production' &&
    process.browser &&
    window.__REDUX_DEVTOOLS_EXTENSION__
) {
    devtools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
}
const Store = createStore(
    Reducers,
    initialState,
    compose(applyMiddleware(...middlewares)
        , devtools
    )
)
export default Store