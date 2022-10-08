import { EncriptyI } from "../../src/interfaces/adapters/encripty.interface";

export default class EncriptyMock implements EncriptyI {
    async hash(value: string, size: number): Promise<string> {
        return value + Date.now + size;
    }
}