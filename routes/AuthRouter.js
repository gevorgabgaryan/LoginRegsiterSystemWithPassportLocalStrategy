const express=require("express")
const passport=require("passport")

const { registerView, registerNewUser, loginView, loginUser, logOut } = require("../controllers/AuthController")
const { validateRegister,checkEmailUnique } = require("../middlewares/validator")

const router=express.Router()

router.route("/register")
.get(registerView)
.post(validateRegister, checkEmailUnique, registerNewUser)


router.route("/login")
.get(loginView)
.post(passport.authenticate('local', { 
     // successRedirect : '/',
      failureRedirect: '/auth/login',
     }),loginUser)

 router.get("/logout",logOut)   

module.exports=router