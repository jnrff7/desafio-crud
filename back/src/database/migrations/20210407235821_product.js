exports.up = function(knex) {
    return knex.schema.createTable('products', function(table) {
        table.increments('id');
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.string('price').notNullable();
        table.string('published_at');
        table.string('published_up');
        table.string('categoria');
        table.boolean('deleted');
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('products');
};