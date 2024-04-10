const {AuthorizeUser} = require('../../model/authorize_user_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'LLL'


const createauthorizeuser = async (req,res)=>{
    try {
        const {role,name,email,password,mobile} = req.body;

        const findEmail = await AuthorizeUser.findOne({email});
        if (findEmail) {
            return res.status(400).json({ message: 'Username or email already exists' });
        };
        const hashedPassword = await bcrypt.hash(password,10);
        const newAuthorizeUser = new AuthorizeUser({
            role,
            name,
            mobile,
            email,
            password:hashedPassword
        });
        const SavedAuthorizeUser = await newAuthorizeUser.save();
        res.status(200).json({message:"SavedAuthorizeUser_200",})
    } catch (error) {
        
    }
}; 
const loginuthorizeuser = async (req,res)=>{
    try {
        const { email , password } = req.body.loginData;
        console.log(req.body.loginData);
        const user = await AuthorizeUser.findOne({email})
        if (!user) {
           return res.status(400).json({message:"user not registered"})
        }
        const checkPassWord = bcrypt.compare(password,user.password);
        if (!checkPassWord) {
            return res.status(400).json({message:"Password is wrong"})
        }
        const token = jwt.sign({
            name:user.name,
            email:user.email

        },SECRET_KEY);
        const userData = {
            name:user.name,
            role:user.role,
            email:user.email,
            mobile:user.mobile,
        }
        return res.status(200).json({message:"loginSucces_200", token:token,userData:userData})
    } catch (error) {
        return res.status(500).json({message:"loginFail_500", error:error})
    }
};


module.exports = {createauthorizeuser,loginuthorizeuser}