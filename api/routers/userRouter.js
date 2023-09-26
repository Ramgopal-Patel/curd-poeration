import express from "express";
import { signIn, signup, test } from "../controllers/userController.js";

const router = express.Router()

router.get('/', test)

// user router

router.post('/signup', signup)
router.post('/login', signIn)




export default router;