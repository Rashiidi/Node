// Import mongoose
const mongoose = require('mongoose');
const bycrypt = require('bcrypt');

// Schema
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
});

//hashing the password before saving it to the database

userSchema.pre("save", async function (next) {
    try {
      const salt = await bycrypt.genSalt(10);
      const hashedPassword = await bycrypt.hash(this.password, salt);
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });


  //comparing password entered to one in db
  userSchema.methods.isValidPassword = async function(password){
    try {
      return await bycrypt.compare(password, this.password);
    } catch(error) {
      throw error;
    }
  };

// Create a model that represents the 'users' collection in the database
const User = mongoose.model('User', userSchema);

// Export the model to use it in other parts of the application
module.exports = User;
