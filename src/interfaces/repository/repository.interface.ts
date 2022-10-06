type WhereType = {
    condition: string;
    value: any;
}

interface RepositoryI {
    create(data: Object, table: string): Promise<boolean>;
    selectAll(table: string):  Promise<Array<Object>>;
    selectWhere(table: string, where: WhereType): Promise<Array<Object>>;
}

export {
    WhereType,
    RepositoryI
};