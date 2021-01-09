const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const salt_round=8


const UserSchema=new mongoose.Schema({
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        lowercase: true,
        unique:true
       },
      password: {
        type: String,
         trim: true,
      },
    }, { timestamps: true });

    UserSchema.pre('save', async function preSave(next){
        const user=this
    try{
        if(!user.isModified("password")) next()

        const hash= await bcrypt.hash(user.password, salt_round)
                
        user.password=hash

        next()
    }catch(err){
        next(err)
    }
        

    })
    
    UserSchema.methods.comparePassword=async function comparePassword(reqPass){

        return await bcrypt.compare(reqPass, this.password)

    }

    module.exports=mongoose.model('User', UserSchema)