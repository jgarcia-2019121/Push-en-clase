//Configuracion a la conexion a la BD
'use strict'

import mongoose from "mongoose"

export const connect = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | could not be connect to mongodb')
            mongoose.disconnect()
        })
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | try connecting')
        })
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | connected to mongodb')
        })
        mongoose.connection.on('open', () => {
            console.log('MongoDB | connected to database')
        })
        mongoose.connection.on('open', () => {
            console.log('MongoFB | reconected to mongodb')
        })
        mongoose.connection.on('disconnected', () => {
            console.log('MongoFB | disconnected')
        })
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50
        })
    } catch (err) {
        console.error('Database conection failed', err)
    }
}