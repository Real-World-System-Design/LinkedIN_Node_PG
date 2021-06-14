import { User } from "src/entities/user.entity";

export function sanitization(user: User) {
    if(user.password) delete user.password
    return user
}