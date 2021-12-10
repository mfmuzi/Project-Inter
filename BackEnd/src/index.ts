import express from 'express';
import 'express-async-errors';
import { createConnection } from 'typeorm';
import { globalErrors } from './middlewares/globalErrors';
import routes from './routes';
import cors from 'cors';

createConnection().then(connection => {
const app = express();
const PORT = 3333;

app.use(cors())
app.use(express.json())
app.use(routes)

app.use(globalErrors)

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

}).catch((error) =>{
  console.log("Unable to connect to the database", error)
});