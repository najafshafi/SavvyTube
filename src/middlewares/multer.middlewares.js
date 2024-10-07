import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 100)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.jpg')
    }
})

export const upload = multer({
    storage: storage
})