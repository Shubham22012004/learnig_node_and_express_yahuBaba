import express from 'express';
import multer from 'multer';
import path from 'path';


const app = express();


app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'./uploads');
    },
    filename:(req,file,cb)=>{
        const newFilename = Date.now() + path.extname(file.originalname);
        cb(null,newFilename);
    }
})

const fileFilter = (req,file,cb)=>{

    /*
    'image/' is commonly used for image files, but you can change this to any MIME type prefix you need, such as 'video/', 'audio/', or specific MIME types like 'application/pdf' for PDFs.

    file.mimetype == 'images/jpeg' || file.mimetype == 'images/png'  if you put this condition then only png and jpeg format allowed

    */

    if(file.mimetype.startsWith('image/')){ //this allowed only images to upload
        cb(null,true);  //true-> for upload the image
    }else{
        cb(new Error('only images are allowed'), false); //false-> do not upload the image
    }
}


const upload = multer({
    storage ,//storage:storage can also used 
    limits : {fileSize:1024*1024*3}, //set size for file
    fileFilter:fileFilter
})

app.get('/',(req,res)=>{
    res.render('home')
})


app.post('/upload',upload.single('uploadedFile'),(req,res)=>{

    if(!req.files || req.files.length === 0){//if user do not upload file and try to submit the form
        return res.status(400).send(`No file upload`)
    }

    res.send(req.files.filename);
}, (error, req, res, next)=>{  //error handling 
    if(error instanceof multer.MulterError){
        return res.status(400).send(`multer error : ${error.message}`);
    }else{
        return res.status(500).send(`something went wrong error other than multer : ${error.message}`);
    }
    next();
})

app.listen(5000,()=>{
    console.log('server is running on 5000');
})