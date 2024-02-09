'use strict' //Modo estricto

import User from './user.models.js'
import { checkPassword, encrypt, checkUpdate } from '../utils/validator.js'

export const test = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}
export const register = async (req, res) => {
    try {
        // Capturar el formulario (body)
        let datua = req.body
        console.log(data)
        // Encriptar la contraseña
        data.password = await encrypt(data.password)
        // Asignar el rol por defecto 
        data.role = 'CLIENT'
        // Guardar la informacionen la BD
        let user = new User(data)
        await user.save()
        //Responder al usuario
        return res.send({ message: `Registered succesfully, can be logged with username ${user.username}` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error registering user', err: err })
    }
}

export const login = async (req, res) => {
    try {
        //capturar los datos (body)
        let { username, password } = req.body
        //validar que el usurao exista
        let user = await User.findOne({ username }) //buscar un solo registro, username: 'el que esta registrado'
        //verifico que la contraseña coincida
        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            //Responde al usuario 
            return res.send({ message: `Welcome ${loggedUser.name}`, loggedUser })
        }
        return res.status(404).send({ message: 'Invalid credentials' })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error to login' })
    }
}

export const update = async (req, res) => {
    try {
        //Obtener el id del usuario a actualizar
        let { id } = req.params
        //Obtener los datos a actualizar
        let data = req.body
        //Validar si trae datos
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannon be' })
        //Validar si tiene permisos (tokenización) X Hoy No lo vemos x
        //Actualizar (BD)
        let updateUser = await User.findOneAndUpdate(
            { _id: id }, //ObjerctsId <- hexadecimales (Hora sys, Version Mongo, LLave private..)
            data, // Los Datos que se van a actualizar
            { new: true }
        )

        //Validar la actualización
        if (!updateUser) return res.status(401).send({ message: 'have submitted some data that cannot be update or missing data' })
        return res.send({ message: 'Update user', updateUser })
    } catch (err) {
        console.error(err);
        if (err.keyValue.username) return res.status(400).send({ message: `Username ${err.keyValue.username} is alredy token` })
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteU = async (req, res) => {
    try {
        //Obtener el id
        let { id } = req.params
        //Validar si esta logeado y es el mismo X No lo vemos hoy X
        //Eliminamos (deleteOne (solo elimino) / findOneAndDelete (Me devuelve el documento eliminado))
        let deletedUser = await User.findOneAndDelete({ _id: id })
        //Verificar que se elimino
        if (!deletedUser) return res.status(404).send({ message: 'Account not found and not deleted' })
        //Responder
        return res.send({ message: `Account with username ${deletedUser.username} deleted succesfully` }) //Envia un status 200
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account' })
    }
}