import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('card', (table) => {
        table.increments('id').unsigned().primary();
        table.string('type').notNullable();
        table.string('number').notNullable();
        table.string('cvv').notNullable();
        table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('card');
}

