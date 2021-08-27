import { hash } from "bcrypt";
import { v4 as uuidV4 } from "uuid";

import createConnection from "../index";

async function create() {
    const connection = await createConnection();

    const id = uuidV4();
    const password = await hash("admin", 8);

    connection.query(
        `INSERT INTO users(id, name, username, password, email, "isAdmin", created_at, driver_license)
            VALUES('${id}', 'admin', 'admin_user', '${password}', 'admin@rentx.com.br', true, 'now()', '2901')`
    )

    await connection.close();
}

create().then(() => console.log("Users Created"))