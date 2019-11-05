export const setRefreshToken = (refreshToken) => localStorage.setItem('RefreshToken', refreshToken);
export const setAccessToken = (accessToken) => localStorage.setItem('AccessToken', accessToken);
export const getRefreshToken = () => localStorage.getItem('RefreshToken');
export const getAccessToken = () => localStorage.getItem('AccessToken');
export const deleteAccessToken = () => localStorage.removeItem('AccessToken');
export const deleteRefreshToken = () => localStorage.removeItem('RefreshToken');