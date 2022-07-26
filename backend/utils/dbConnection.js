import mysql from "mysql"
import {config} from "dotenv"
config({path: "./.env"})

export default function dbConnection() {
    const dbConnect = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    })
    dbConnect.connect((err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Connected to database")
            let SQL = " CREATE TABLE IF NOT EXISTS files(id INT PRIMARY KEY AUTO_INCREMENT, description VARCHAR(255) DEFAULT NULL, file VARCHAR(255) NOT NULL)";
            dbConnect.query(SQL,(err,result)=>{
                if(err){
                    console.log(err)
                }
                console.log("table created successfully")
            })
        }
    }
    )
    return dbConnect
}