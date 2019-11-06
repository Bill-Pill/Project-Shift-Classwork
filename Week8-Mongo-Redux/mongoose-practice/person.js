const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/peopleDB');
const Schema = mongoose.Schema;

const beerSchema = new Schema({
  name: String,
  abv: Number,
  style: String
})

const Beer = mongoose.model('Beer', beerSchema)

let drinkoInsano = new Beer({
  name: 'Drinko Insano',
  abv: 29,
  style: 'Mead'
})


const addressSchema = new Schema({
  city: String,
  street: String,
  apartment: Number
})

const personSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  age: {
    type: Number,
    min: 10
  },
  address: addressSchema,
  updated_at: Date,
  created_at: Date
});

personSchema.pre('save', function (next) {
  const currentDate = new Date();

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
})
const Person = mongoose.model('Person', personSchema)

Person.remove({}, err => {
  if (err) throw err;

  // we have deleted the person
  console.log('Persons deleted!');
});