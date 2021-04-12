import { request } from "./api";

export class UserApi {
    static async login(credentials: {password: string, email: string}) : Promise<any> {
        const {data: {name, token, emailConfirmed}} = await request('login', 'POST', credentials);
        window.localStorage.setItem('user-token', token);
        window.localStorage.setItem('user-name', name);
        window.localStorage.setItem('user-confirmed', emailConfirmed);
        return;
    }
    static async create(user: {password: string, email: string, name: string}) : Promise<any> {
        await request('user', 'POST', user);
        return;
    }
    static async validateEmal(code: string) : Promise<any> {
        await request(`emailvalidate/${code}`, 'POST');
        window.localStorage.setItem('user-confirmed', new Date().toISOString());
        return;
    }
    static async newEmailValidator() : Promise<any> {
        await request(`newvalidatelogin`, 'POST');
        return;
    }
    static logOut() {
        window.localStorage.removeItem('user-token');
        window.localStorage.removeItem('user-name');
        window.localStorage.removeItem('user-confirmed');
    }
}