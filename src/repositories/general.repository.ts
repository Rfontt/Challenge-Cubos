import connection from '../database/connection';
import { RepositoryI, WhereType } from '../interfaces/repository/repository.interface';

export default class GeneralRepository implements RepositoryI {
    async create(data: Object, table: string): Promise<any> {
        try {
            return await connection.insert(data).table(table).returning('*');
        } catch (error) {
            throw new Error(error);
        }
    }

    async selectAll(table: string): Promise<Array<Object>> {
        try {
            const data = await connection
                .select("*")
                .table(table);

            return data;
        } catch (error) {
            throw new Error(error);
        }
    }

    async selectWhere(table: string, where: WhereType): Promise<Array<Object>> {
        try {
            const data = await connection
                .select("*")
                .table(table)
                .where(where.condition, where.value);

            return data;
        } catch (error) {
            throw new Error(error);
        }
    }
}