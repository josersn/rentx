import { Connection, createConnection, getConnectionOptions } from "typeorm";


export default async(host = "localhost"): Promise<Connection> => {
    // se usar docker colocar database no host
    const defaultOptions =await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            host
        })
    )
}