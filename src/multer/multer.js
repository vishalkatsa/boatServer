const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Specify the directory where you want to store uploaded files
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        // Encode special characters in the file name
        const encodedFileName = encodeURIComponent(Date.now() + '-' + file.originalname);
        cb(null, encodedFileName);
    },
}); 

// Initialize Multer with the storage settings
const upload = multer({ storage: storage });

module.exports = upload;