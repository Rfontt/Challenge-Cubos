import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('transaction', (table) => {
        table.increments('id').unsigned().primary();
        table.double('value', 255).notNullable();
        table.string('description', 255).notNullable();
        table.timestamps(true, true);

        table.integer('type_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('type');

        table.integer('receiverAccountId')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('account');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('transaction');
}

