import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('people', (table) => {
        table.increments('id').unsigned().primary();
        table.string('name', 100).notNullable();
        table.string('document', 20).unique().notNullable();
        table.string('password', 200).notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('people');
}
