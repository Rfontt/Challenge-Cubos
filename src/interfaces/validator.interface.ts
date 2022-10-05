interface ValidatorI {
    cpf(document: string): boolean;
    cnpj(document: string): boolean;
}

export {
    ValidatorI
}