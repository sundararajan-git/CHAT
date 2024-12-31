import { v2 as cloudinary } from "cloudinary"
import { config } from "dotenv"

config()

cloudinary.config({
    cloud_name: "",
    api_key: "",
    api_secret: ""
})

export default cloudinary