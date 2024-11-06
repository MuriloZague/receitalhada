import { Request } from 'express';

export default interface UserRequest extends Request {
  user?: {
    id_user: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    img_url?: string;
  };
}
