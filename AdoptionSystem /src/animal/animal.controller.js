'use strict'

import Animal from './animal.models.js'
import { checkUpdate } from '../utils/validator.js'

export const testA = (req, res) => {
    console.log('test is running')
    return res.send({ message: 'Test is running' })
}

export const registerA = async (req, res) => {
    try {
        let data = req.body;
        console.log(data);
        let animal = new Animal(data);
        await animal.save();
        return res.send({ message: `Animal has been registered: ${animal.name}` });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error registering animal', error: err });
    }
}

export const updateA = async (req, res) => {
    try {
        let { id } = req.params
        let data = req.body
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannon be' })
        let updateAnimal = await Animal.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updateAnimal) return res.status(401).send({ message: 'have submitted some data that cannot be update or missing data' })
        return res.send({ message: 'Update animal', updateAnimal })
    } catch (err) {
        console.error(err);
        if (err.keyValue.name) return res.status(400).send({ message: `Animal ${err.keyValue.name} is alredy token` })
        return res.status(500).send({ message: 'Error updating account' })
    }
}

export const deleteA = async (req, res) => {
    try {
        let { id } = req.params
        let deletedAnimal = await Animal.findOneAndDelete({ _id: id })
        if (!deletedAnimal) return res.status(404).send({ message: 'Account not found and not deleted' })
        return res.send({ message: `Account with ${deletedAnimal.name} deleted succesfully` })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: 'Error deleting account' })
    }
}
