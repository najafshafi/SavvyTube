import { asyncHandler } from '../utils/asyncHandler.js';

const registerUser = asyncHandler(async (req, res) => {

    const { email, password, username, fullName, avatar, coverImage, } = req.body;

    if (!email || !password || !username || !fullName || !avatar || !coverImage) {
        return res.status(400).json({
            message: 'Please fill all fields',
        });
    }

    res.status(200).json({
        message: 'User Registered Successfully',
    });
})

export { registerUser }