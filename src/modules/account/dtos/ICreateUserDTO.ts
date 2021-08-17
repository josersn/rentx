
export interface ICreateUserDTO {
    id?: string,
    name: string,
    username: string,
    password: string,
    email: string,
    driver_license: string,
    avatar?: string
}