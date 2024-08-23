import express, { Request, Response } from "express";
import { initDatabase } from "./database/db";
import { Parameters } from "./utils/constants";
import { userRouter } from "./modules/user";

const app = express();

app.use(express.json());

app.use("/user", userRouter);

// GET, POST, PUT, DELETE, PATCH -> estandar 

// Callback -> Function que se pasa como argumento a otra

// Function es el mecanismo que tengo para reutilizar codigo

// Query Params, params, body
app.get("/", (req: Request, res: Response) => {
    res.status(200).send({ hello: "world!!!" });
});

app.post("/", (req: Request, res: Response) => {
    res.send({ hello: "desde ruta post" });
});


// GET -> Obtencion de informacion

// POST -> Escritura de datos

// DELETE -> Eliminacion de datos

// PUT y PATCH Se centran en actualizacion de datos

// PATCH -> Actualizacion parcial

// PUT -> Actualizacion destructiva

// Cliente hasta el servidor

// CODIGOS DE ESTADO HTTP

// Desde el servidor responserle al usuario

// 1xx - 2xx - 3xx - 4xx - 500

// 1xx -> Informacion

// 2xx -> Exitoso

// 3xx -> Redirecciones

// 4xx -> Errores de Usuario

// 5xx -> Errores de servidor

app.listen(8080, async () => {
    const url = `mongodb://${Parameters.DATABASE_HOST}:${Parameters.DATABASE_PORT}/${Parameters.DATABASE_NAME}`;
    await initDatabase(url);
    console.log("Server running at port 8080");
});