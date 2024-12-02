const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });
 
const fileFilter = (req, file, cb) => {
    if(file.mimetype.startsWith('image/')){
        cb(null, true)
    }
    else {
        cb( new Error("only image are allowed"), false)
    }
}  

const upload = multer({ storage: storage, fileFilter });

module.exports = upload