import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/usermodel.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnCloudinary } from '../utils/cloudnary.js';

const registerUser = asyncHandler(async (req, res) => {

    const { email, password, username, fullName, avatar, coverImage, } = req.body;
    if (!email || !password || !username || !fullName) {
        throw new ApiError(400, 'Please fill all fields',);
    }

    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
        throw new ApiError(400, 'User Already Exists');
    }

    //First property
    // console.log(req.files?.avatar[0]?.path);
    const avatarLocalPath = req.files?.avatar[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, 'Please Upload Avatar.');
    }

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
        // Proceed to upload cover image if it exists

    }

    const uploadAvatarResponse = await uploadOnCloudinary(avatarLocalPath);

    if (!uploadAvatarResponse) {
        throw new ApiError(400, 'Error While Uploading Avatar');
    }



    const uploadCoverImageResponse = await uploadOnCloudinary(coverImageLocalPath);


    const crearteUser = await User.create({
        email,
        username: username.toLowerCase(),
        fullName,
        avatar: uploadAvatarResponse.url,
        password,
        coverImage: uploadCoverImageResponse?.url || " ",
    })


    const createdUser = await User.findById(crearteUser._id).select('-password -refreshToken');

    if (!createdUser) {
        throw new ApiError(500, 'Error While Registering User');
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, 'User Registered Successfully'),
    );
})

export { registerUser }