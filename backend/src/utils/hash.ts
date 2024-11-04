import { compare, hash } from 'bcrypt';

export async function encrypt(password: string): Promise<string> {
    return await hash(password, 8);
}

export async function decrypt(password: string, hash: string): Promise<boolean> {
    const result = await compare(password, hash);
    return result;
}
