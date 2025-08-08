const multer = require("multer");
const storage = multer.memoryStorage();
const uploadImage = multer({ storage: storage });

module.exports = uploadImage;
