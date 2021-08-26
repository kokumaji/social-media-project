import { DeliveryServer } from "../DeliveryServer";
import fileUpload from "express-fileupload";
import * as crypto from "crypto";
import path from "path";
import fs from 'fs';

export const registerRoutes = (server: DeliveryServer) => {
    const app = server.app;

    app.get('/media/:hash', (req, res, next) => {
        const dataFolder = path.join(__dirname, '../data/files/');
        const requestedFile = req.params.hash.split(".")[0];

        if(!requestedFile) return res.status(404).json({ msg: "No Arguments Provided" });

        for(const file of fs.readdirSync(dataFolder)) {
            const fileHash = file.split('.')[0];
            if(requestedFile == fileHash) {
                const fullPath = dataFolder + file;
                return res.status(200).sendFile(fullPath);
            }
        }
         
        return res.redirect('http://localhost:3000/404');        
    });

    app.post('/upload', (req, res) => {
        if(!req.files || !req.files.image) return res.status(403).json({ msg: "No File Provided" });
    
        const dataFolder = path.resolve(__dirname, "../data/files/");
        const imageFile = req.files.image as fileUpload.UploadedFile;
        const fileHash = crypto.createHash('md5').update(imageFile.data).digest('hex');
        
        const fileExt = imageFile.name.split(".")[1];
        if(!fileExt) return res.status(403).json({ msg: "Invalid File Type" });
        
        const uploadPath = dataFolder + "/" + fileHash + "." + fileExt;
        if(fs.existsSync(uploadPath)) {
            return res.status(304).json({ msg: "File Already Uploaded" });
        }

        imageFile.mv(dataFolder + "/" + fileHash + "." + fileExt, (err: Error) => {
            if(err) console.log(err);
        });

        return res.status(200).json({ msg: "" });
    });

}