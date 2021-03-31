import { createConnection } from "typeorm";

//import { UserDAO } from "@app/domain/models";

const Connection = createConnection({
  database: "node_backend_acacia",
  //entities: [UserDAO],
  host: "localhost",
  logging: false,
  password: "",
  port: 3306,
  synchronize: false,
  type: "mysql",
  username: "root",
});

export default Connection;
