import mongoose from "mongoose";
import JWT from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minLength: [3, "minimum length of the name must be at least 3 character"],
        maxLength: [30, "maximum length of the name must be less than 30 character"],
        required: true

    },
    email: {
        type: String,
        trim: true,
        unique: [true, 'provided email already exists.'],
        tolowercase: true,
        required: true

    },
    password: {
        type: String,
        minLength: [8, 'password must be at least 8 character'],
        required: true

    },
    forgotPassword: {

    }

}, {
    timestamps: true
})

userSchema.methods = {
    jwtToken() {
        return JWT.sign(
            { id: this._id, email: this.email },
            process.env.SECRET,
            { expiresIn: "24h" }
        )
    }
}
export default mongoose.model('User', userSchema);