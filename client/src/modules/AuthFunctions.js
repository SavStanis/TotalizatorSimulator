export const setToken = token => localStorage.setItem('token', token);
export const checkToken = () => localStorage.getItem('token') !==null;
export const deleteToken = () => localStorage.removeItem('token');
export const getToken = () => localStorage.getItem('token');