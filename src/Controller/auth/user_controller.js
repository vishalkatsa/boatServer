const User = require('../../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'LLL';

const createuser = async (req,res) =>{
    try {
        const {firstname,lastname,number,email,password,address,pincode} = req.body;
        

        const user = await User.findOne({email});
        if (!User) {
            return res.status(201).send("user_already_201")
        }
        console.log(user);
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = new User({
            firstname,
            lastname,
            number,
            email,
            password:hashPassword,
            address,
            pincode
        });
        
        await newUser.save()
        return res.status(200).json({message:"userCreated_200"})

    } catch (error) {
        return res.status(500).send("error_500"),console.log(error);
        
    }
}
const loginuser = async (req,res)=>{
    try {
        const { email , password } = req.body;
        // console.log(req.body.loginData);
        const user = await User.findOne({email})
        if (!user) {
           return res.status(400).json({message:"user not registered"})
        }
        const checkPassWord =await bcrypt.compare(password,user.password);
        if (!checkPassWord) {
            return res.status(400).json({message:"Password is wrong"})
        }
        const token = jwt.sign({
            name:user.firstname,
            email:user.email

        },SECRET_KEY);
        const userData = {
            firstname:user.firstname,
            lastname:user.lastname,
            number:user.number,
            email:user.email,
            _id:user._id
        }
        return res.status(200).json({message:"loginSucces_200", token:token,userData:userData})
    } catch (error) {
        return res.status(500).json({message:"loginFail_500", error:error})
    }
}

module.exports = {createuser,loginuser}