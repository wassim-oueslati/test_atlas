const express = require('express');
const mongoose = require('mongoose');
const app = express();
const connectDB=require('./DB/connectDB')


//Create a person with this prototype:
const  PersonSchema = new mongoose.Schema({
    
    name:{
        type:String,
        required: true  
    },
    age:Number,
    favoriteFoods: [String],
    date: {
      type: Date,
      default: Date.now
    }

})



var Person = mongoose.model('Person', PersonSchema);

//Create and Save a Record of a Model:
async function createAndSave(){
  const person = new Person ({
    name: "wassim",
    age: 21,
    favoriteFoods: ['Pasta', 'Pizza']
  });
        
  await person.save();
  console.log(Person )
};  
createAndSave()


//Create Many Records with model.create()
async function createManyRecords (arrayOfPeople){
    var arrayOfPeople = [
        {name: "Mohamed", age: 55, favoriteFoods: ["vodka"]},
        {name: "Ahmed", age: 16, favoriteFoods: ["chicken"]},
        {name: "Mary", age: 26, favoriteFoods: ["wine"]}
      ];
   await Person.create(arrayOfPeople);
    console.log(arrayOfPeople)
  };
createManyRecords()



//Use model.find() to Search Your Database
async function searchByName(personName){
  await Person.find({name: personName});
};
searchByName()



//Use model.findOne() to Return a Single Matching Document from Your Database
async function matchingByFood(food) {
    await Person.findOne({favoriteFoods: food});
  };
matchingByFood()



//Use model.findById() to Search Your Database By _id
async function searchById(personId){
  await Person.findById(personId);
};
searchById()



//Perform Classic Updates by Running Find, Edit, then Save
async function findEditSave(personId){
    const foodToAdd = "hamburger";
    // .findById() 
    await Person.findById(personId, (err, person) => {
      if(err) return console.log(err); 
      // Array.push() 
      person.favoriteFoods.push(foodToAdd);
      // save() 
     person.save();
    })
};
findEditSave()



// Perform New Updates on a Document Using model.findOneAndUpdate()
async function findAndUpdate(personName){
  const ageToSet = 20;
  await Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}
  );
};
findAndUpdate()



//Delete One Document Using model.findByIdAndRemove
async function deleteById(personId){
  await  Person.findByIdAndRemove(personId);
};
deleteById()  



//MongoDB and Mongoose - Delete Many Documents with model.remove()
async function deleteManyDocuments(done){
  const nameToRemove = "Mary";
  await Person.remove({name: nameToRemove}, (err, res) => {
    if(err) return console.log(err);
    done(null, res);
  });
};
deleteManyDocuments()



// Chain Search Query Helpers to Narrow Search Results
async function ChainSearchQuery(done){
  var foodToSearch = "burrito";
   Person
  .find({favoriteFoods: foodToSearch})
  .sort({ name: 1 })
  .limit(2)
  .select({ age: 0 })
  .exec((err, data) => {
    if (err) return console.log(err);
    done(null, data);
  });
};
ChainSearchQuery()



connectDB()

app.listen(3000,function(req,res){
   console.log('Server is started on port 3000');
});






