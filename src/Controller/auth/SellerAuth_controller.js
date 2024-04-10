const {SellerAuth} = require('../../model/SellerAuth_model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'LLL'


const createsellerauth = async (req,res)=>{
    try {
        const {role,name,email,password,mobile,shop_or_company,gstnumber} = req.body;

        const userWithEmailOrMobile = await SellerAuth.findOne({ $or: [{ email }, { mobile }] });
        // console.log(userWithEmailOrMobile);
        if (userWithEmailOrMobile) {
            return res.status(201).json({ message: 'User mobile or email already exists' });
        };
        const hashedPassword = await bcrypt.hash(password,10);
        const newSellerAuth = new SellerAuth({
            role,
            name,
            mobile,
            email,
            shop_or_company,
            gstnumber,
            password:hashedPassword
        });
        const SavedSellerAuth = await newSellerAuth.save();
        res.status(200).json({message:"SavedSellerAuth_200",})
    } catch (error) {
        return res.status(500).json({message:"createFail_500", error:error})
    }
}; 
const loginsellerauthorize = async (req,res)=>{
    try {
        const { email , password } = req.body;
        // console.log(req.body.loginData);
        const user = await SellerAuth.findOne({email})
        if (!user) {
           return res.status(400).json({message:"user not registered"})
        }
        const checkPassWord =await bcrypt.compare(password,user.password);
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
            shop_or_company:user.shop_or_company,
            gstnumber:user.gstnumber,
            _id : user?._id
        }
        return res.status(200).json({message:"loginSucces_200", token:token,userData:userData})
    } catch (error) {
        return res.status(500).json({message:"loginFail_500", error:error})
    }
};


module.exports = {createsellerauth,loginsellerauthorize}