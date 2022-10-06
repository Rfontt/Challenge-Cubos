import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('account', (table) => {
        table.increments('id').unsigned().primary();
        table.string('branch', 3).notNullable();
        table.string('account', 10).unique().notNullable();

        table.integer('id_people')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('people')

        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('account');
}

