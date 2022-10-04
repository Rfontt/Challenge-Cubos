import compliceApi from "../ports/compliance-api.port";

async function loginComplice() {
    try {
        const token = await compliceApi.post(
            "/auth/code",
            {
                email: process.env.EMAIL,
                password: process.env.PASSWORD
            }
        );

        return token;
    } catch(error) {
        throw new Error("Error making login");
    }
}

export { loginComplice };