import { request } from "./api";

export class ProductApi {
    static async list() : Promise<any> {
        const {data} = await request(`products`);
        return data;
    }
    static async save(product:any) : Promise<any> {
        return await request(`products`,'post',product);        
    }
    static async update(product:any) : Promise<any> {
        return await request(`products/${product.id}`,'put',product);        
    }
    static async delete(id:number) : Promise<any> {
        return await request(`products/${id}`,'delete');        
    }
}