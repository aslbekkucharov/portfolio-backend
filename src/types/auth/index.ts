export type AuthPayload = { username: string, password: string }
export type SignInResponseData = { id: number, username: string, name: string, role: string }
export interface AuthResult {
    token: string,
    user: SignInResponseData
}

export enum UserRole {
    ADMIN = 'admin',
    MODERATOR = 'moderator'
}