import axios from 'axios'
import {  refreshSession, removeSession, setSession } from './services/JWTAuthService';
import { isValidSession } from './services/JWTAuthService';
import {getToken} from './services/JWTAuthService'
//axios axiosApi without bearer
export const axiosApi = axios.create()
axiosApi.defaults.baseURL="/api"
axiosApi.interceptors.request.use(
    async (config) => {
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    });
axiosApi.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error.response.data);
});


//axios with Bearer
export const axiosWithBearer = axios.create()
axiosWithBearer.interceptors.request.use(
    async (config) => {
        var accessToken = getToken()
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    });
axiosWithBearer.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error.response.data);
});


//default axios
axios.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error.response.data);
});


//instance axios
var axiosInstance = axios.create()
axiosInstance.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error.response.data);
});


//custom axios
const authAxiosApi = axios.create()
authAxiosApi.defaults.baseURL = '/api'
authAxiosApi.interceptors.request.use(
    async (config) => {
        var lastToken = getToken()
            if (!isValidSession()) {
                try {
                    axiosInstance.defaults.headers.common.Authorization = `Bearer ${lastToken}`;
                    var result = await axiosInstance.post('/api/Auth/RefreshToken', {
                        Token: lastToken,
                    })
                    var { token, isSuccess } = result;
                    if (isSuccess) {
                        setSession(token,true)
                        var newToken = getToken()
                        config.headers.Authorization = `Bearer ${newToken}`;
                        
                    } else {
                        removeSession()
                    }
                } catch {
                    removeSession()
                }
            } else {
                refreshSession()
            }
        
        
        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    });
authAxiosApi.interceptors.response.use(function (response) {
    return response.data;
}, function (error) {
    return Promise.reject(error.response.data);
});

export default authAxiosApi