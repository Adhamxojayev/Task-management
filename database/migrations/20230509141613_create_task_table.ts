import { Knex } from 'knex';

exports.up = function (knex: Knex): Promise<void> {
  return knex.schema.createTable('Task', function (table) {
    table.increments('id').primary();
    table.integer('created_by').references('Users.id');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.integer('project_id').references('Project.id');
    table.dateTime('due_date').notNullable();
    table.integer('worker_user_id').references('Users.id');
    table
      .enum('status', ['CREATED', 'IN_PROCESS', 'DONE'])
      .defaultTo('CREATED')
      .notNullable();
    table.dateTime('done_at');
  });
};

exports.down = function (knex: Knex): Promise<void> {
  return knex.schema.dropTable('Task');
};
