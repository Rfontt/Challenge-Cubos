import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { LoginI, LoginResponse } from '../../interfaces/login/login.interface';
import { PeopleType } from '../../interfaces/people/people.interface';
import { RepositoryI, WhereType } from '../../interfaces/repository/repository.interface';

export default class LoginUseCase implements LoginI {
    #repository: RepositoryI;

    constructor(repository: RepositoryI) {
        this.#repository = repository;
    }

    async makeLogin(people: PeopleType): Promise<LoginResponse> {
        try {
            const where: WhereType = { condition: 'document', value: people.document };
            const data: Object[] = await this.#repository.selectWhere('people', where);

            console.log(data);

            if (data.length > 0) {
                const peopleData = data[0] as PeopleType;
                const comparePassword = await bcrypt.compare(
                    people.password,
                    peopleData.password
                );
                
                console.log(comparePassword);

                if (comparePassword) {
                    const tokenGenerated = jwt.sign({
                        document: people.document
                    }, `${process.env.JWT_KEY}`);
                    
                    return {
                        token: tokenGenerated,
                        status: 200
                    }
                }
            }

            return {
                status: 406,
                error: "User not permitted",
                token: "", 
            }
        } catch (error) {
            return {
                status: 500,
                error: "Internal server error",
                token: "", 
            }
        }
    }
}