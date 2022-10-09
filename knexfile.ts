import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default {
    development: {
        client: 'pg',
        connection: {
           host: 'db',
           user: process.env.POSTGRES_USER || "free",
           password: process.env.POSTGRES_PASSWORD || "free",
           database: process.env.POSTGRES_DB || "cubos"
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: path.resolve(
                __dirname, 'src', 'database', 'migrations'
            ),
        },
        useNullAsDefault: true,
    }
}