type AuthCodeType = {
    userId: string;
    authCode: string;
}

type AuthTokenType = {
    idToken: string;
    accessToken: string;
    refreshToken: string;
}

export {
    AuthCodeType,
    AuthTokenType
}