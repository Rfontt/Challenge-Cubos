import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { RepositoryI, WhereType } from '../../src/interfaces/repository/repository.interface';

export default class RepositoryMock implements RepositoryI {
    update(data: Object, table: string, where: WhereType): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    getArchivePath() {
        return path.resolve(__dirname, ".", "archives", "test.json");
    } 

    selectAll(table: string): Promise<Object[]> {
        throw new Error("Method not implemented.");
    }
    
    selectWhere(table: string, where: WhereType): Promise<Object[]> {
        throw new Error("Method not implemented.");
    }
    
    async create(data: Object, table: string): Promise<any> {
        await fsPromises.writeFile(
            this.getArchivePath(),
            JSON.stringify(data)
        );
    }   
}