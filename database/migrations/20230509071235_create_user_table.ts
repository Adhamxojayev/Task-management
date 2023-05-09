import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', function (table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable().unique();
    table
      .enu('role', ['admin', 'manager', 'employee'], {
        useNative: true,
        enumName: 'role',
      })
      .notNullable();
    table.integer('created_by').references('users.id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
