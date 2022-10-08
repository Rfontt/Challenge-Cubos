type MessagePattern = {
    message: string;
    status: number;
}

type ObjectResponse = {
    message: Object[] | Object;
    error?: string;
    status: number
}

export {
    MessagePattern,
    ObjectResponse
}