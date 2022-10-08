import { AuthCodeType, AuthTokenType } from "../interfaces/complice/complie-api.interface";
import compliceApi from "../ports/compliance-api.ports";

async function getAuthCode(): Promise<string> {
    try {
        const authCode = await compliceApi.post(
            "/auth/code",
            {
                email: process.env.EMAIL,
                password: process.env.PASSWORD
            }
        );

        const data: AuthCodeType = authCode.data;

        return data.authCode;
    } catch(error) {
        throw new Error("Error getting auth code");
    }
}

async function getToken() {
    try {
        const authCode = await getAuthCode();

        const authToken = await compliceApi.post(
            "/auth/token",
            {
                authCode
            }
        );

        const data: AuthTokenType = authToken.data;

        return data.accessToken;
    } catch(error) {
        console.log(error)
        throw new Error("Error getting token");
    }
}

export { getToken };