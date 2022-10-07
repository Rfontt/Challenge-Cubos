import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transaction', (table) => {
        table.increments('id').unsigned().primary();
        table.string('value', 255).notNullable();
        table.string('description', 255).unique().notNullable();
        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transaction');
}

