import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
(async function () {
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
    });
})();



const uploadOnCloudinary = async (localfilepath) => {
    if (!localfilepath) {
        return res.status(400).json({
            status: 'error',
            message: 'Error While Uploading Image',
        });
    }
    else {
        const response = await cloudinary.uploader
            .upload(
                localfilepath, {
                resource_type: 'auto',
                public_id: 'avatar',
            }
            )
            .catch((error) => {
                fs.unlinkSync(localfilepath);
                console.log(error);
            });

        console.log("Url:", response.url);
        return response;
    }
}