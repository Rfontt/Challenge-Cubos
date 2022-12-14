type WhereType = {
    condition: string;
    value: any;
}

interface RepositoryI {
    create(data: Object, table: string): Promise<any>;
    selectAll(table: string):  Promise<Array<Object>>;
    selectWhere(table: string, where: WhereType): Promise<Array<Object>>;
    update(data: Object, table: string, where: WhereType): Promise<boolean>;
}

export {
    WhereType,
    RepositoryI
};