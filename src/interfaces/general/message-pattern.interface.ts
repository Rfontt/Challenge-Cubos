type MessagePattern = {
    message: string;
    status: number;
}

type ObjectResponse = {
    message: Object[];
    error?: string;
    status: number
}

export {
    MessagePattern,
    ObjectResponse
}