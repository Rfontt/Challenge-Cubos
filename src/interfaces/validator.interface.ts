interface ValidatorI {
    cpf(document: string): Promise<boolean>;
    cnpj(document: string): Promise<boolean>;
}

export {
    ValidatorI
}