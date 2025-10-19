import mongoose from 'mongoose';

const reg_schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
    // confirmPassword: { type: String, required: true }
})

const reg_model = mongoose.model('reg_model', reg_schema);
export default reg_model;

//or  export default mongoose.model('reg_model', reg_schema);
