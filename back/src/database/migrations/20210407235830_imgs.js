exports.up = function(knex) {
    return knex.schema.createTable('imgs', function(table) {
        table.increments('id');
        table.string('name');
        table.string('path');
        table.boolean('deleted');
        table.integer('products_id').notNullable();
        table.foreign('products_id').references('id').inTable('products');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('imgs');
};