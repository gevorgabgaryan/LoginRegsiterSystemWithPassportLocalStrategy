const { render } = require("../app");

const UserModel=require("../models/UserModel")

class AuthController{

    registerView(req,res){
        let message=""
        res.render('register',{message:message})
    }

    /**
     * register post function
     * @param {*} req 
     * @param {*} res 
     */
    async registerNewUser(req,res){

   try{
        let user=await UserModel.create({
                username:req.body.username,
                email:req.body.email,
                password:req.body.password,
            })
         if(!user){
            return  res.status(400).json({error:"Unexpected Error"})
         }
             return res.redirect("/auth/login")

   }catch(err){
       console.log("err")
        return res.status(400).json({error:"Unexpected Error"})
   }     
     

     

    }

   loginView(req,res){
       let message=""
       res.render("login",{message:message})
   }

}

module.exports=new AuthController()