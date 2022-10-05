import bcrypt from 'bcryptjs';

import connection from '../database/connection';
import { PeopleType } from '../interfaces/people.interface';
import { RepositoryI } from '../interfaces/repository.interface';

export default class PeopleRepository implements RepositoryI {
    async create(data: Object): Promise<boolean> {
        try {
            const peopleObject = data as PeopleType;
            const hash = await bcrypt.hash(
                peopleObject.password,
                10
            );

            const creating = await connection.insert({
                name: peopleObject.name,
                document: peopleObject.document,
                password: hash,
            });

            console.log(creating);

            return true;
        } catch (error) {
            throw new Error("Error creating people.")
        }
    }
}