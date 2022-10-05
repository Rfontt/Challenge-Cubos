import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('account_card', (table) => {
        table.increments('id').unsigned().primary();
        
        table.integer('id_account')
            .unsigned()
            .references('id')
            .inTable('account');

            table.integer('id_card')
            .unsigned()
            .references('id')
            .inTable('card');

            table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('account_card');
}

