import express from "express";
import cors from 'cors';
import routes from './routes';
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

export { app };