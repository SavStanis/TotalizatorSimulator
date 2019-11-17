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
    await axios.post(`${API_URL}/user/refresh-tokens`,{refreshToken: refreshToken})
        .then((response) => {
            if(response.status === 200) {
                setAccessToken(response.data.accessToken);
                setRefreshToken(response.data.refreshToken);
                result = true;
            }
        })
        .catch((error) => {
            deleteAccessToken();
            deleteRefreshToken();
            localStorage.removeItem('login');
            localStorage.removeItem('email');
            localStorage.removeItem('moneyAmount');
            result = false;
        });
    return result;
};

export const checkToken = async () => {
    let headerAuth = "Bearer " + getAccessToken();
    let needToRefresh = false;
    await axios.get(
        `${API_URL}/user/check-token`, { headers: { Authorization: headerAuth } }
    ).catch((error) => {
        needToRefresh = true;
    });

    let result = true;
    if(needToRefresh) {
        result = await refreshTokens();
    }
    return result;
};