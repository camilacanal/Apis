  import { MongoClient } from "mongodb";

const connectionString = "mongodb+srv://camicanal22:Camila2003@programacion.gpqkiq6.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("austral");

export default db;
  