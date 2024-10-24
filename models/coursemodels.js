const mongoose = require('mongoose');

// Define the Course Schema
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
       
    },

    duration: {
        type: Number,
        required: true, 
    },
   
    instructor: {
        type: String,
        required: true
    }
});


const Course = mongoose.model('Course', courseSchema);

module.exports = Course;