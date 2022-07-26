import dbConnection from "../utils/dbConnection.js";

const connection = dbConnection();

import Jimp from 'jimp'

export const uploadFile = async (req,res)=>{
    try{
        const directory = "C:/Users/pacis/Documents/projects/athelas-full-stack-app/"
        if(req.file == undefined || req.file == {} || req.file == null){
            return res.status(400).send({
                message: "No file selected"
            })
        }
        req.file.path = req.file.path.replace("\\","/")
        const url = directory+ req.file.path
        console.log(url)

        const image = await Jimp.read(
            url
        )
        image.rotate(90,function(err){
            console.log(err)
            if(err) throw err
        })
        .write(directory + 'rotated.png');

        req.body.file = (req.file.path.replace("\\","/")).replace(" ","%20");
        
        const SQL = "INSERT INTO files SET ?";
        connection.query(SQL,req.body,(err,result)=>{
            if(err){
                return res.status(400).send({
                    message: err.message
                })
            }
            return res.status(200).send({
                message: "File uploaded successfully"
            })
        })
    }
    catch(err){
        return res.status(500).send({
            message: err.message
        })
    }
    
}