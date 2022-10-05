interface RepositoryI {
    create(data: Object): Promise<boolean>;
}

export {
    RepositoryI
};