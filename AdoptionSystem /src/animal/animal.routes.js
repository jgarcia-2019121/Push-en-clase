import express from 'express'
import { testA, registerA, updateA, deleteA } from './animal.controller.js'

const api = express.Router()

api.get('/testA', testA)
api.post('/registerA', registerA)
api.put('/updateA/:id', updateA)
api.delete('/deleteA/:id', deleteA)

export default api