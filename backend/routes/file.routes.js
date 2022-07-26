import express from "express"
import { uploadFile } from "../controllers/file.controller.js"
import { uploadingFile } from "../utils/fileUploading.js"

const upload = uploadingFile("files/")
const router = express.Router()

router.post("/save",upload.single("file"),uploadFile)

export default router