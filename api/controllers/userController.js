import User from "../modals/userModel.js"
import emailValidator from "email-validator"
// testing server

const test = (req, res) => {
    return res.status(200).send('*********All is well*********')
}

// user signup

const signup = async (req, res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "name is required."
            })
        }
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "email is required."
            })
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "password is required."
            })
        }
    }
    if (!emailValidator.validate(email)) {
        return res.status(400).json({
            success: false,
            message: "please provide valid email Id."
        })
    }
    try {
        const userInfo = req.body;
        const duplicateUser = await User.findOne({ email })
        if (duplicateUser) {
            return res.status(400).json({
                success: false,
                message: "User already exist please try to login."
            })
        }
        const user = await User.create(userInfo)
        return res.status(200).json({
            success: true,
            message: "user signup successfully!",
            user
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }

}

// user login 

const signIn = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "email is required"
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "password is required."
            })
        }
    }
    if (!emailValidator.validate(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email Id!"
        })
    }
    try {
        const user = await User
            .findOne({ email })
            .select("+password")
        if (!user || user.password !== password) {
            if (user.email != email) {
                return res.status(400).json({
                    success: false,
                    message: "user not exist please signup & try to login"
                })
            }
            return res.status(400).json({
                success: false,
                message: "Wrong password!"
            })
        }
        user.password = undefined;
        const token = user.jwtToken();
        const cookieOption = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true
        }
        res.cookie("token", token, cookieOption);
        res.json({
            success: true,
            message:'user logged in successfully!',
            user
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
export { test, signup, signIn }