import multer from "multer";

export function uploadingFile(destination){
    const storage = multer.diskStorage({
        destination: (req,file,cb)=>{
            cb(null,destination)
        },
        filename: (req,file,cb)=>{
            let random = Math.random();
            cb(null,random+file.originalname)
        }
    })

    const fileFilter = (req,file,cb)=>{
        if(file.mimetype == 'image/jpeg' || file.mimetype == "image/jpg" || file.mimetype == "image/png"){
            cb(null,true)
        }
        else{
            cb("File not supported",false)
        }
    }

    const upload = multer({
        storage: storage,
        fileFilter: fileFilter
    })

    return upload
}