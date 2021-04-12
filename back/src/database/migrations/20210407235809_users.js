
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id');
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('token');
        table.string('email_code');
        table.datetime('email_confirmed');
        table.boolean('deleted');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
