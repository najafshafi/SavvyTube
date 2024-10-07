// import { v2 as cloudinary } from 'cloudinary';
// import fs from 'fs';
// (async function () {
//     cloudinary.config({
//         cloud_name: process.env.CLOUD_NAME,
//         api_key: process.env.API_KEY,
//         api_secret: process.env.API_SECRET,
//     });
// })();



// const uploadOnCloudinary = async (localfilepath) => {
//     if (!localfilepath) {
//         return res.status(400).json({
//             status: 'error',
//             message: 'Error While Uploading Image',
//         });
//     }
//     else {
//         const response = await cloudinary.uploader
//             .upload(
//                 localfilepath, {
//                 resource_type: 'auto',
//                 public_id: 'avatar',
//             }
//             )
//             .catch((error) => {
//                 fs.unlinkSync(localfilepath);
//                 console.log(error, "Form Cloudinary");
//             });

//         console.log("Url:", response.url);
//         return response;
//     }
// }

// export { uploadOnCloudinary }

import { v2 as cloudinary } from "cloudinary"
import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file has been uploaded successfull
        //console.log("file is uploaded on cloudinary ", response.url);
        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locally saved temporary file as the upload operation got failed
        return null;
    }
}



export { uploadOnCloudinary }