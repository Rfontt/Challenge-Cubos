type WhereType = {
    condition: string;
    value: any;
}

interface RepositoryI {
    create(data: Object, table: string): Promise<boolean>;
    selectAll(table: string):  Promise<Object>;
    selectWhere(table: string, where: WhereType): Promise<Object>;
}

export {
    WhereType,
    RepositoryI
};