const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => { 
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });
    afterAll(() => {
        connection.destroy();
    });
    it('Should create ong', async () => {
        const response = await request(app).post('/ongs')
            .send({
                name: "APAED",
                email: "givasjs@gmail.com",
                whatsapp: "4353245",
                city: "sampa",
                 uf: "SP"
            });            
            expect(response.body).toHaveProperty('id');
            expect(response.body.id).toHaveLength(8);
        
    }); 
});