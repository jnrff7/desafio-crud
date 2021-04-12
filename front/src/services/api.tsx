import axios, { Method } from 'axios';

export async function request(path: string, method: Method = 'get', data: any = null) {
    const token = window.localStorage.getItem('user-token');
    if (token) {
        axios.defaults.headers.common = {
            Authorization: `Bearer ${token}`,
        }
    }
    try {        
        const response  = await axios(
            {
                baseURL: `http://localhost:3333`,
                url: path,
                method,
                data
            }            
        );
        return response;
    } catch (error) {
        return error;
    }
};