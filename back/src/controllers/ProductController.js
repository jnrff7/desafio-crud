const connection = require('../database/connection');
const getLogedUser = require('../utils/getLogedUser');

module.exports = {
    async index(request, response) {

        try {
            const user = await getLogedUser(request);

            const products = await connection('products')
                .where('user_id', user.id)
                .andWhere('deleted', false)
                .select('*');
            return response.json(products);
        } catch (error) {
            if (error.code) {
                return response.status(error.code).json(error.message);
            }
            return response.status(500).json(error);
        }
    },
    async create(request, response) {
        try {
            const user = await getLogedUser(request);
            const { name, description, price } = request.body;

            await connection('products').insert({
                name,
                description,
                price,
                published_at: new Date().toISOString(),
                published_up: new Date().toISOString(),
                categoria: null,
                user_id: user.id,
                deleted: false
            });

            return response.status(201).json();
        } catch (error) {
            if (error.code) {
                return response.status(error.code).json(error.message);
            }
            return response.status(500).json(error);
        }
    },
    async delete(request, response) {
        try {
            const user = await getLogedUser(request);
            const { id } = request.params;

            await connection('products')
                .where('user_id', user.id)
                .andWhere('id', id)
                .update({
                    deleted: true,
                });

            return response.status(200).json();
        } catch (error) {
            if (error.code) {
                return response.status(error.code).json(error.message);
            }
            return response.status(500).json(error);
        }

    },
    async update(request, response) {
        try {
            const user = await getLogedUser(request);
            const { name, description, price } = request.body;

            const { id } = request.params;

            await connection('products')
                .where('user_id', user.id)
                .andWhere('id', id)
                .update({
                    name,
                    description,
                    price,
                    published_up: new Date().toISOString(),
                    categoria: null,
                });

            return response.status(200).json();
        } catch (error) {
            if (error.code) {
                return response.status(error.code).json(error.message);
            }
            return response.status(500).json(error);
        }

    }
};