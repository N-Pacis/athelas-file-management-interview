import express,{urlencoded,json} from 'express';
import {config} from "dotenv"
config({path: "./.env"})
import { fileURLToPath } from 'url';
import path,{dirname} from "path"
import fileRoutes from "./routes/file.routes.js"
import cors from "cors"

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors())
app.use("/files",express.static(path.join(__dirname,"files")))
app.use(json());
app.use(urlencoded({extended: true}))
app.use(fileRoutes)


app.listen(process.env.PORT,()=>{
    console.log(`Server connected on port ${process.env.PORT}`)
})