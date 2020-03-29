
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table){
    table.increments();

    table.string('inc_title').notNullable();
    table.string('inc_description').notNullable();
    table.decimal('inc_value').notNullable();

    table.string('inc_idong').notNullable();

    table.foreign('inc_idong').references('ong_id').inTable('ongs');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
