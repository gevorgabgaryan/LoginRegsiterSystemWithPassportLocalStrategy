const express=require("express")

const { registerView, registerNewUser } = require("../controllers/AuthController")
const { validateRegister,checkEmailUnique } = require("../middlewares/validator")

const router=express.Router()

router.route("/register")
.get(registerView)
.post(validateRegister, checkEmailUnique, registerNewUser)

module.exports=router