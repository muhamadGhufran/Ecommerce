import {Schema, model, models} from 'mongoose'

const UserSchema = new Schema ({
    email:{
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"],
    },
    fullName:{
        type: String,
        required: [true, "Full name is required"],
        minLength: [3, "Full name should be atleast 3 characters long"],
        maxLength: [30, "Full name should be less then 30 characters"]
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        select: false
    }
})

const User = models.User || model("User", UserSchema)

export default User;