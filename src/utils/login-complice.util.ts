import compliceApi from "../ports/compliance-api.port";

function loginComplice() {
    try {
        compliceApi.post(
            "/auth/code",
            {
                "email": process.env.EMAIL,
                "password": process.env.PASSWORD
            }
        );
    } catch(error) {
        throw new Error("Error making login");
    }
}

export { loginComplice };