import {Request, Response} from "express";
import { UserModel } from "../models/Users";

export default{
    signUp: async (req: Request, res: Response) => {
        try {
            //obtener informacion de peticion
            const name = req.body.name;
            const password = req.body.password;
            const email = req.body.email;
            const rol = req.body.rol;
            //Validaciones que existan
            if (!name || !password || !email || !rol){
                res.status(400).json({msg:"Faltan parametros para crear usuario"})
            }
            //Crear registro de bd
            await UserModel.create({
                name, 
                password,
                email,
                rol
            });
            res.status(200).json({msg: "Usuario exitoso"})
            return;

        } catch (error) {
            console.log("Error ocurrido", error)
            res.status(500).json({msg:"Ocurrio un error al registrar usuario"})
        }
    },
    signIn: async (req: Request, res: Response) => {
        try {
            //Obetener datos
            const email = req.body.email;
            const password = req.body.password;
            //Buscar usuario correo y contrasena 
            const user = await UserModel.findOne({
                email,
                password
            });
            //Validar que usuario existe
            //findOne registro o indefinido
            if (!user) {
                res.status(400).json({msg:"No se encuentra usuario con esas credenciales"})
                return;
            }
            res.status(200).json({msg:"El usuario inicio sesion bien", user});
            return;
        } catch (error) {
            console.log("Error ocurrido", error)
            res.status(500).json({msg:"Ocurrio un error al iniciar sesion"})
            return;
        }
    }
}