const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
    name: String,
    salary: Number,
    aproved: Boolean,

})

module.exports = Person;