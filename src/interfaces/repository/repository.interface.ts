interface RepositoryI {
    create(data: Object, table: string): Promise<boolean>;
}

export {
    RepositoryI
};