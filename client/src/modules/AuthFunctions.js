import axios from 'axios';
import {API_URL} from '../config';

export const setRefreshToken = (refreshToken) => localStorage.setItem('RefreshToken', refreshToken);
export const setAccessToken = (accessToken) => localStorage.setItem('AccessToken', accessToken);
export const getRefreshToken = () => localStorage.getItem('RefreshToken');
export const getAccessToken = () => localStorage.getItem('AccessToken');
export const deleteAccessToken = () => localStorage.removeItem('AccessToken');
export const deleteRefreshToken = () => localStorage.removeItem('RefreshToken');

const refreshTokens = async () => {
    const refreshToken = getRefreshToken();
    let result;
    try {
        const response = await axios.post(`${API_URL}/user/refresh-tokens`, {refreshToken: refreshToken});
        if (response.status === 200) {
            setAccessToken(response.data.accessToken);
            setRefreshToken(response.data.refreshToken);
            result = true;
        }
    } catch (error){
        deleteAccessToken();
        deleteRefreshToken();
        localStorage.removeItem('login');
        localStorage.removeItem('email');
        localStorage.removeItem('moneyAmount');
        result = false;
        console.log(error);
    }
    return result;
};

export const checkToken = async () => {
    let headerAuth = "Bearer " + getAccessToken();
    let needToRefresh = false;
    try {
        await axios.get(`${API_URL}/user/check-token`, { headers: { Authorization: headerAuth } })
    } catch(error) {
        console.log(error);
        needToRefresh = true;
    }
    let result = true;
    if(needToRefresh) {
        result = await refreshTokens();
    }
    return result;
};