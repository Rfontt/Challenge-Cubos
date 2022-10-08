interface EncriptyI {
    hash(value: string, size: number): Promise<string>;
}

export { EncriptyI };