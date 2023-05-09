import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Organizations', function (table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable().unique();
    table.integer('created_by').references('Users.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Organizations');
}
