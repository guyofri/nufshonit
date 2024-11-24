export interface UserLogin {
    username: string;
    password: string;
}

export interface UserRegister {
    username: string;
    password: string;
    firstName: string;
}

export interface LoginResponse {
    token: string;
    firstName: string;
}
