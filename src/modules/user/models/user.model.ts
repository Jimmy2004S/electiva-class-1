import { Schema, model } from "mongoose";
import { IUser } from "../interface/user.interface";
import bcrypt from "bcrypt";

// Generics
// Esquema del usuario
const userSchema = new Schema<IUser>({
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true }
});


// Middleware para encriptar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
    const user = this as IUser;

    if (!user.isModified("password")) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    const user = this as IUser;
    return bcrypt.compare(candidatePassword, user.password);
};

export const UserModel = model("users", userSchema);