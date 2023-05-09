import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('Users', function (table) {
    table.increments('id').primary();
    table.string('name', 255).notNullable().unique();
    table
      .enu('role', ['admin', 'manager', 'employee'], {
        useNative: true,
        enumName: 'role',
      })
      .notNullable();
    table.integer('created_by').references('Users.id').onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('Users');
}
