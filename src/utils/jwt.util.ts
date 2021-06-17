import * as jwt from 'jsonwebtoken';
import {User} from '../entities/user.entity';
const SECRET = "some-very-very-secret";

export async function sign(user: User): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        jwt.sign({
            username: user.username,
            email: user.email    
        }, SECRET, (err: any, encoded: any | string) => {
            if(err) throw reject(err)
            return resolve(encoded)
        });
    });
}
export async function decode(token: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
        jwt.verify(token, SECRET, (err, decoded) => {
            if(err) throw reject(err)
            return resolve(decoded as User)
        });
    });
}