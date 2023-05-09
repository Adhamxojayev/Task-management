import { Knex } from 'knex';

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable('OrganizationUser', function (table) {
    table.increments('id').primary();
    table.integer('org_id').references('Organizations.id');
    table.integer('user_id').references('Users.id');
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTable('OrganizationUser');
};
