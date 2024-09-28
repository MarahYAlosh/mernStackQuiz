import mongoose from 'mongoose';
const {Schema} = mongoose

const userModal = new Schema({
    name : String,
    email : String,
    password : String,
    role: {
        type : String,
        default : "student"
    }
})

export default mongoose.model('users' , userModal) 