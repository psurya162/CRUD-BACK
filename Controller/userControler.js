const { generateToken } = require("../confige/jwtToken");
const User = require("../models/usermodels");
const asynchandler = require("express-async-handler");



const createUuser = asynchandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({ email });
    try {
        if (!findUser) {
            const newUser = await User.create(req.body);
            res.status(200).json({
                message: 'User created successfully',
                user: newUser
            });
        } else {
            res.status(200).json({
                message: 'User already exists'
            });
        }
    } catch (err) {
        res.status(400).json({
            error: err.message
        });
    }
});

const loginUsercntrl = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const findUser = await User.findOne({ email });
        if (!findUser) {
            return res.status(401).json({
                message: "User not found"
            });
        }

        // Verify password
        const isPasswordMatched = await findUser.isPasswordMatched(password);
        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Incorrect email or password"
            });
        }

        // Password matched, send success response
        res.json({
            _id: findUser._id,
            firstname: findUser.firstname,
            lastname: findUser.lastname,
            mobile: findUser.mobile,
            email: findUser.email,
            token: generateToken(findUser._id)
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
};


// Get all users

const getAllUser = asynchandler(async(req,res)=>{
    try{
        const AllUser = await User.find()
        res.status(200).json(AllUser)
    }
    catch(Err){
        res.status(200).json({
            messsage:"Error While Fetching All User"
        })
    }
})

const SingleUser = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
        const singleuser = await User.findById(id)
        res.json(singleuser)
    }catch(err){
        res.status(401).json({
            message:"errror"
        })
    }

    
})

const DeleteUser = asynchandler(async(req,res)=>{
    const {id} = req.params;
    try{
        const DeleteSingleUser = await User.findByIdAndDelete(id)
        res.json(DeleteSingleUser)
    }catch(err){
        res.status(401).json({
            message:"Not Deeleted"
        })
    }
})

const UpdateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, mobile, email } = req.body;
    try {
        const updateuser = await User.findByIdAndUpdate(id, { firstname, lastname, mobile, email }, { new: true });
        res.json(updateuser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = { createUuser, loginUsercntrl ,getAllUser , SingleUser ,DeleteUser ,UpdateUser };
