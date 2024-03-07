import mongoose from "mongoose";
import bcrypt from "bcrypt"

// An interface that describes the properties 
// that are required to create a new user
interface UserAttr{
    email: string,
    password: string
} 

// An interface that describes  the properties 
// that a User Model has

interface UserModel extends mongoose.Model <UserDoc>{
    build(attrs: UserAttr) : UserDoc
}


// An interface that describes  the properties 
//a user document has
interface UserDoc extends mongoose.Document {
    email: string;
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    const salt = await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt)
    
})

userSchema.statics.build = (attrs: UserAttr)=>{
    return new User(attrs);
}

const User = mongoose.model<UserDoc, UserModel>('User', userSchema)




export { User}