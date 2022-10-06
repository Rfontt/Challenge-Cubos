import { Knex } from "knex";

export async function up(knex: Knex) {
    return Promise.all([
        knex.schema.createTable("type", function (table) {
            table.increments('id').unsigned().primary();
            table.string('name').notNullable();
            table.timestamps(true, true);
        }).then(function () {
                return knex("type").insert([
                    { name: "VIRTUAL" },
                    { name: "PHYSICAL" },
                ]);
            }
        ),
    ]);
};

export async function down(knex: Knex) {
    return Promise.all([
        knex.schema.dropTable('type')
    ]);
};