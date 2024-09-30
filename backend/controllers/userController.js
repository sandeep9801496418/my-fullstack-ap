const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register new user
exports.registerUser = async(req, res)=>{
    const {username, email, dob, role, location, password} = req.body;
    try{
        const newUser = new User({username, email, dob, role, location, password});
        await newUser.save();
        res.status(201).json({message: 'User registered successfully'});
    } catch(error){
        res.status(400).json({message: 'Error registering user', error});
    }
};

// Login user
exports.loginUser = async(req, res)=>{
    const {username, password } = req.body;
    try{
        const user = await User.findOne({username });
        if (user && (await bcrypt.compare(password, user.password))){
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET,{
                expiresIn: '1h',
            });
            res.json({message: 'Login successful', token});
        }else{
            res.status(401).json({message: 'Invalid credentials'});
        }
    }catch(error){
        res.status(400).json({message: 'Login error', error});
    }
};

// Get all users (Admin only)
exports.getAllUsers = async(req, res)=>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        res.status(400).json({message: 'Error fetching users', error});
    }
};

// Update user details (Admin only)
exports.updateUser = async(req, res)=>{
    try{
        const {username} = req.params;
        const updatedData = req.body;
        const updatedUser = await User.findOneAndUpdate({username}, updatedData, {new: true});
        res.json({message: 'User updated successfully', updatedUser});
    }catch (error) {
        res.status(400).json({message: 'Error updating user', error});
    }
};

// Delete user (Admin only)
exports.deleteUser = async (req, res)=>{
    try{
        const {username} = req.params;
        await User.findOneAndDelete({username});
        res.json({message: 'User deleted successfully'});
    }catch(error){
        res.status(400).json({message: 'Error deleting user', error});
    }
};
