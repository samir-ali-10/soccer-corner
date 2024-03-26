const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
    destination: (req , file , cb ) => {
        cb(null , '../uploads/images')
    } ,
    filename : (req ,file , cb) => {
      let ext = path.extname(file.originalname)
        cb(null , Date.now() + ext);
    }
});

const fileFilter = (req , file, cb ) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null , true);
    } else {
        cb(null , false);
    }
}

var upload = multer({storage : fileStorage  , fileFilter : fileFilter });




module.exports = upload ;