import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('people', (table) => {
        table.increments('id').unsigned().primary();
    })
}


export async function down(knex: Knex): Promise<void> {
}

