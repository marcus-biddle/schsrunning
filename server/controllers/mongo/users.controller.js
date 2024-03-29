import User from "../../models/User.js";
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcrypt';

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean();
    if (!users?.length) return res.status(400).json({ "message": "No users found." });
    console.log('getAllUsers', users);
    res.json(users);
});

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username, password, roles } = req.body;
    console.log('createNewUser');
    // Confirm data
    if (!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ "message": "All fields are required." });
    };

    const duplicate = await User.findOne({ username }).lean().exec();

    if (duplicate) return res.status(409).json({ "message": "Duplicate username." })

    //hash password
    const hashPassword = await bcrypt.hash(password, 10)

    const userObject = { username, "password": hashPassword, roles };

    //Create and store new user
    const user = await User.create(userObject);
    console.log('createNewUser, user', user);

    if (user) {
        res.status(201).json({ "message": `New user ${username} created!` });
    } else {
        res.status(400).json({ "message": "Invalid user data received." });
    }
});

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    //Confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ "message": "All fields are required." })
    }

    const user = await User.findById(id).exec()

    if (!user) return res.status(400).json({ "message": "User not found." })

    // Check duplicate
    const duplicate = await User.findOne({ username }).lean().exec()
    // Allow updates to original user
    if (duplicate && duplicate?._id.toString() !== id) return res.status(409).json({ "message": "Duplicate username." })

    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        //Hash password
        user.password = await bcrypt.hash(password, 10)
    }

    const updatedUser = await user.save()

    res.json({ "message": `${updatedUser.username} updated `})
});

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.body
    if (!id) return res.status(400).json({ "message": "Use ID Required." })

    const user = await User.findById(id).exec();

    if (!user) return res.status(400).json({ "message": "User not found." })

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
});

export default {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}