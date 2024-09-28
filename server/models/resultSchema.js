import mongoose from 'mongoose';
const {Schema} = mongoose

const resultModal = new Schema({
    username:{ type: String},
    result:{ type : Array , default : []},
    level : { type : String , default: ''},
    points: { type : Number , default: 0},
    achived : { type : String , default : ''},
    timer : { type : Number , default: 0},
    createdAd : { type : Date , default : Date.now}
})

// export const results = mongoose.model('Result' , resultModal)
export default mongoose.model('result' , resultModal)