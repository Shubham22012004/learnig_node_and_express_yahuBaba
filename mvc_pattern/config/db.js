import mongoose from 'mongoose';

const connectDB = () => {
     mongoose.connect('mongodb://127.0.0.1:27017/contact-app')
    .then(console.log("db connected sucdessfully"))
    .catch(err => console.error("DB connection error:", err));
}
/* you can not directly export the "mongoose.connect()"
    so a var called connectDB used
*/

export default connectDB;