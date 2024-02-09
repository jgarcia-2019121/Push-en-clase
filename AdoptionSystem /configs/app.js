// levantar servidor HTTP (express)
//ESModules
'use strict'

//importaciones
import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import { config } from "dotenv"
import userRoutes from '../src/user/user.routes.js'
import animalRoutes from '../src/animal/animal.routes.js'


//configuraciones
const app = express()
config();
const port = process.env.PORT || 3056

//configuracion del servidor
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) //Aceptar o denegar solicitudes de diferentes origenes (local, remoto) / politico de acceso
app.use(helmet()) //Aplicar capa de seguridad basica al servidor
app.use(morgan('dev')) //Logs de solicitudes al servidor HTTP

//Declaraion de rutas
app.use(userRoutes)
app.use(animalRoutes)

//Levantar el servidor
export const initServer = () => {
    app.listen(port)
    console.log(`Server HTTP running in port ${port}`)
}