import { IUserRole } from "./UserRole";

export interface IUser {
    username: string,
    email: string,
    password: string,
    jwtToken: string,
    role: IUserRole
    isBlocking: Boolean
}