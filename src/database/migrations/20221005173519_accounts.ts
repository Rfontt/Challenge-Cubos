import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('account', (table) => {
        table.increments('id').unsigned().primary();
        table.string('branch').notNullable();
        table.string('account').notNullable();

        table.integer('id_people')
            .unsigned()
            .references('id')
            .inTable('people')

        table.timestamps(true, true);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('account');
}

