import dotenv from 'dotenv';

dotenv.config();

export const auth = {
    secret: String(process.env.JWT_TOKEN),
    expiresIn: String(process.env.JWT_EXPIRES_IN)
}