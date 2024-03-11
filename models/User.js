const mongoose = require('mongoose');
const { isEmail} = require('validator');
const brcypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']



    },
    password:  {
        type: String,
        required: [true, 'Please enter an password'],
        minlenght: [6, 'Minimun password lenght is 6 characters']
    },


});



// fire a function before doc saved to db
userSchema.pre('save', async function (next){
    const salt = await brcypt.genSalt();
    this.password = await brcypt.hash(this.password, salt);
    next();
})


const User = mongoose.model('user', userSchema);

module.exports = User;