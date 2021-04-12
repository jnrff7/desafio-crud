const connection = require('../database/connection');

module.exports = async function (request) {
    const { authorization } = request.headers;

    if (!authorization) {
        throw {code: 400, message: 'invalid request'};
    }
    const token = authorization.split(' ')[1];
    
    const userInDB = await connection('users')
            .where('token', token)
            .select('*')
            .first();
    
    if (!userInDB) {
        throw {code: 401, message: 'user not founded'};
    }

    return userInDB;
}