export type AuthPayload = { username: string, password: string }
export type SignInData = { id: number, username: string, name: string, role: string }
export interface AuthResult extends SignInData { token: string }

export enum UserRole {
    ADMIN = 'admin',
    MODERATOR = 'moderator'
}
