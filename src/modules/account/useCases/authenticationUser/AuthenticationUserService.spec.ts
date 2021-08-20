import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserService } from "../createUser/CreateUserService";
import { AuthenticationUserService } from "./AuthenticationUserService"

describe("Authenticate user", () => {

    let authenticateUserService: AuthenticationUserService;
    let usersRepositoryInMemory: UsersRepositoryInMemory;
    let createUserService: CreateUserService;

    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserService = new AuthenticationUserService(usersRepositoryInMemory);
        createUserService = new CreateUserService(usersRepositoryInMemory);
    })

    it("Should be able to create a authentication token", async () => {
        const user: ICreateUserDTO = {
            driver_license: "123786",
            email: "tes@gmail.com",
            name: "Testinho",
            password: "teste123",
            username: "teste"
        }

        await createUserService.execute(user);

        const result = await authenticateUserService.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token");
    })

    it("Should not be able to create a authentication token an noexistent user", () => {
        expect(async () => {

            await authenticateUserService.execute({
                email: "erro@gmail.com",
                password: "1345"
            })
        }).rejects.toBeInstanceOf(AppError);
    })

    it("Should not be able to create a authentication token with incorrect password", () => {
        expect(async () => {

            const user: ICreateUserDTO = {
                driver_license: "123786",
                email: "tes@gmail.com",
                name: "Testinho",
                password: "teste123",
                username: "teste"
            }
    
            await createUserService.execute(user);

            await authenticateUserService.execute({
                email: user.email,
                password: "1345"
            })

        }).rejects.toBeInstanceOf(AppError);
    })
})