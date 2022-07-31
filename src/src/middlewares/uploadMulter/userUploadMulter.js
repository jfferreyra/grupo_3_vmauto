const multer = require("multer");
const path=require('path');

  const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
      cb(null,'public/users/images');
    },
    filename:(req,file,cb)=>{
      // const newFilename=`${req.params.id}-${file.fieldname}${path.extname(file.originalname)}`;
      const newFilename=`${req.params.id}-img${path.extname(file.originalname)}`;
      cb(null,newFilename);
    }
  });

  const upload=multer({storage});

module.exports=upload;