import mongoose from "mongoose"
import keeper from "./user"

const animalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    weight: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    race: {
        type: String,
        required: true
    }
})

//Pre mongoose 
//plurarizar animal
export default mongoose.model('animal', animalSchema)