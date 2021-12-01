const mongoose = require('mongoose');
const URI ='mongodb+srv://wassim:Tunistunis2021*@cluster0.1dgw5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


const connectDB = async ()=>{
    await mongoose.connect(URI,{ useNewUrlParser: true, useUnifiedTopology: true });
    console.log('connected');
}
module.exports = connectDB;





