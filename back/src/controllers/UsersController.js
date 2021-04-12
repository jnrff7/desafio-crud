const connection = require('../database/connection');
const generateID = require('../utils/generateUniqueID');
const generatePassword = require('../utils/generatePassword');
const sendEmail = require('../services/sendEmail');
const getLogedUser = require('../utils/getLogedUser');

module.exports = {
    async create(request, response) {
        
        const { name, email, password } = request.body;

        const userInDB = await connection('users')
            .where('email', email)
            .select('id')
            .first();

        if (userInDB) {
            return response.status(400).json({ error: 'user already exists' });
        }

        const emailCode = generateID();
        await sendEmail(email, emailCode);

        await connection('users').insert({
            name,
            email,
            password: generatePassword(password),
            email_code: emailCode,
            deleted: false
        });

        return response.status(201).json();
    },
    async login(request, response) {
        
        const { email, password } = request.body;

        const userInDB = await connection('users')
            .where('email', email)
            .select('id', 'name', 'password', 'email_confirmed')
            .first();

        if (userInDB && userInDB.password === generatePassword(password)) {

            const token = generatePassword(Date.now() + '');

            await connection('users')
            .where('id', userInDB.id)
            .update({
                token
            });

            return response.json({
                name: userInDB.name,
                emailConfirmed: userInDB.email_confirmed,
                token
            });
        }

        return response.status(401).json({ error: 'credentials are invalid' });
    },
    async newValidateLogin(request, response) {
        try {
            const user = await getLogedUser(request);
            await sendEmail(user.email, user.email_code);
        } catch (error) {
            if (error.code) {
                return response.status(error.code).json(error.message);
            }
            return response.status(500).json(error);
        }
    },
    async validateEmail(request, response) {
        
        const { code } = request.params;

        const userInDB = await connection('users')
            .where('email_code', code)
            .select('id', 'email_confirmed')
            .first();

        if (!userInDB) {
            return response.status(400).json({ error: 'code is invalid' });
        }
        if (userInDB && userInDB.email_confirmed) {
            return response.status(400).json({ error: 'code already used' });
        }

        await connection('users')
        .where('id', userInDB.id)
        .update({
            email_confirmed: new Date().toISOString(),
        });

        return response.json();
    }
};