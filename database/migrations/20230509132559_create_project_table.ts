import { Knex } from 'knex';

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable('Project', function (table) {
    table.increments('id').primary();
    table.integer('org_id').references('Organizations.id');
    table.integer('created_by').references('Users.id');
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTable('Project');
};
