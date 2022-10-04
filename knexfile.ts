import path from 'path';

export default {
    development: {
        client: 'pg',
        connection: {
            host: 'db',
            user: 'postgres',
            password: 'postgres'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: path.resolve(
                __dirname, 'src', 'database', 'migrations'
            ),
        },
        useNullAsDefault: true,
    }
}