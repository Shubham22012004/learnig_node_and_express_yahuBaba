import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const contactSchema = mongoose.Schema( {
    name:{type:String},
    lname:{type:String},
    email:{type:String},
    phone:{type:Number},
    address:{type:String}
})

contactSchema.plugin(mongoosePaginate);

export const Contact = mongoose.model('Contact', contactSchema)
