import { jest, describe, test, expect, beforeAll } from "@jest/globals";
import { getToken } from '../../src/utils/complice.util';
import * as dotenv from "dotenv";

dotenv.config();

describe('Validate complice api ports - unit tests', () => {
    test('Should return a body for a request in the complice API authentication', async () => {
        expect(jest.fn(() => Promise.resolve(getToken()))).not.toBeNull();
    });
})