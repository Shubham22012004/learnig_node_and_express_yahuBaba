import mongoose from 'mongoose';

const contactSchema = mongoose.Schema( {
    name:{type:String},
    lname:{type:String},
    email:{type:String},
    phone:{type:Number},
    address:{type:String}
})

export const Contact = mongoose.model('Contact', contactSchema)
