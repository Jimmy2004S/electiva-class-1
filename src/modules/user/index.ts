import { Request, Response, Router } from "express";
import { v4 } from "uuid";
import { createUser, getAllUsers, getUserById, deleteById, login} from './controller/user.controller';
import { Types } from "mongoose";
import { schemaValidator } from "../../middleware/schema.middleware";
import { userSchemaCreate } from "./schemas/user.schema";

const userRouter = Router();

let users: any[] = [];

userRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;
    const user = await getUserById(id);
    if(!user) {
        res.status(404).send({
            msg: "User not found"
        });
    } else {
        res.status(200).send(user);
    }
});

userRouter.post("/", schemaValidator(userSchemaCreate), async (req: Request, res: Response) => {
    try {
        console.log("Enter to route");
        const body = req.body; // Payload -> Carga util de la peticion
        const newUser = await createUser(body);
        res.status(201).send({ msg: "Creado con exito", user: newUser });
    } catch (error) {
        res.status(400).send({
            msg: "Error al crear el usuario"
        })
    }
});

userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers();
        res.status(200).send({
            users: users
        });
    } catch (error) {
        res.status(500).send({
            msg: "Error could get the users"
        });
    }
});

userRouter.patch("/:id", (req: Request, res: Response) => {
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

userRouter.delete("/:id", (req: Request, res: Response) =>{
    try{
        const id = req.params.id;
        const user =  getUserById(id);
        if(!user) {
            res.status(404).send({
                msg: "User not found"
            })
        }else{
            deleteById(id)
            res.status(200).send({ msg: "Eliminado con exito" });
        }
    }catch(error){
        console.log(error);
    }
});

userRouter.post("/login", async (req: Request, res: Response) => {
    try{
        const {email, password} = req.body; // Payload -> Carga util de la peticion
        const match = await login(email, password)

        if(match){
            res.status(200).send({
                msg: "Login correcto",
            })
        }else{
            res.status(401).send({
                msg: "Login incorrecto",
            })
        }
        
    }catch(error){
        res.status(500).send({
            msg: "Error en el login"
        })
    }
})


export { userRouter };