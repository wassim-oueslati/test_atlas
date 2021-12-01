const mongoose = require('mongoose')

const  userSchema = new mongoose.Schema({
    Person :{
        name:{
            type:String
        },
        age:Number,
        favoriteFoods: [String],
    }
})

module.exports = mongoose.model('User',userSchema)