import connection from '../database/connection';
import { RepositoryI } from '../interfaces/repository/repository.interface';

export default class GeneralRepository implements RepositoryI {
    async create(data: Object, table: string): Promise<boolean> {
        try {
            await connection.insert(data).table(table);

            return true;
        } catch (error) {
            throw new Error("Error creating data.");
        }
    }
}