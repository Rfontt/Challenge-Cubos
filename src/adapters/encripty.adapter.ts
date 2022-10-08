import bcrypt from 'bcryptjs';
import { EncriptyI } from "../interfaces/adapters/encripty.interface";

export default class EncriptyAdapter implements EncriptyI {
    async hash(value: string, size: number): Promise<string> {
        const hash = await bcrypt.hash(
            value,
            size,
        );

        return hash;
    }
}