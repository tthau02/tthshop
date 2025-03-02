export interface IRegister {
    username: string,
    email: string,
    password: string,
    confirmPassword: string | undefined
}

export interface ILogin {
    email: string,
    password: string
}