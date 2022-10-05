import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('people', (table) => {
        table.increments('id').unsigned().primary();
        table.string('name').notNullable();
        table.string('document').notNullable();
        table.string('password').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('people');
}

