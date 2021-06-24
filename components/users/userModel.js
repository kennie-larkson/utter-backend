import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  memberId: mongoose.ObjectId,
  age: {
    type: Number,
    required: true
  },
 
  gender: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

const test_user = new User({
  name : {
    fname: 'Kennie',
    lname: 'Lawal'
  },
  email : 'abcd@gmail.com',
  password: 'somefreakypassword1234',
  age: 20,
  gender: 'Male'
})
// await test_user.save().then(()=> console.log('Successful...')).catch(err => console.log(`Oops: ${err}`))

setTimeout(async function() {
  await test_user.save().then(()=> console.log('Successful...')).catch(err => console.log(`Oops: ${err}`))
}, 60000);


export default User;
