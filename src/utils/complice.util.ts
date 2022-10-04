import compliceApi from "../ports/compliance-api.port";

async function getAuthCode(): Promise<string> {
    try {
        const authCode = await compliceApi.post(
            "/auth/code",
            {
                email: process.env.EMAIL,
                password: process.env.PASSWORD
            }
        );

        return authCode.data.authCode;
    } catch(error) {
        throw new Error("Error getting auth code");
    }
}

async function getToken() {
    try {
        const authCode = await getAuthCode();

        const token = await compliceApi.post(
            "/auth/token",
            {
                authCode
            }
        );

        return token.data;
    } catch(error) {
        console.log(error)
        throw new Error("Error getting token");
    }
}

export { getToken };