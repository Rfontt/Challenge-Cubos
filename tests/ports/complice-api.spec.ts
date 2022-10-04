import { describe, test, expect, beforeAll } from "@jest/globals";
import { loginComplice } from '../../src/utils/login-complice.util';
import * as dotenv from "dotenv";

dotenv.config();

describe('Validate complice api ports - unit tests', () => {
    test('Should return a body for a request in the complice API authentication', async () => {
        const token = await loginComplice();

        expect(token).not.toBeNull();
    });
})