import express, { Request, Response } from "express";
import { v4 } from "uuid";

const app = express();

app.use(express.json());

let users: any[] = [];

// GET, POST, PUT, DELETE, PATCH -> estandar 

// Callback -> Function que se pasa como argumento a otra

// Function es el mecanismo que tengo para reutilizar codigo

// Query Params, params, body
app.get("/", (req: Request, res: Response) => {
    res.status(400).send({ hello: "world!!!" });
});

app.get("/user/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const user = users.find(user => user.id === id);
    if(!user) {
        res.status(404).send({
            msg: "User not found"
        });
    } else {
        res.send(user);
    }
});

app.post("/", (req: Request, res: Response) => {
    res.send({ hello: "desde ruta post" });
});

app.post("/user", (req: Request, res: Response) => {
    const body = req.body; // Payload -> Carga util de la peticion
    console.log(body);
    const id = v4();
    // Deestructuacion
    const user = {
        id: id,
        ...body // Destructuring
    };
    users.push(user);
    res.status(201).send({ msg: "Creado con exito", user: user });
});

app.get("/user", (req: Request, res: Response) => {
    res.send(users);
});

app.patch("/user/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    const user = users.find(user => user.id === id);
    if(!user) {
        res.status(404).send({
            msg: "User not found"
        });
    } else {
        const body = req.body;
        users = users.map(item => {
            if(item.id === user.id) {
                return { ...user, ...body }; // Deestructuracion
            }
            return item;
        });
        res.status(200).send({ msg: "Actualizado con exito" });
    }
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

app.listen(8080, () => {
    console.log("Server running at port 8080");
});