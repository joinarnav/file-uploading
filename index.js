const express=  require('express');
const path= require('path');
const multer= require('multer');
const { name } = require('ejs');

const app= express();
const port= 3000;

// const upload= multer({dest: "uploads/"})

const storage = multer. diskStorage({
    destination: function(req, file, cb){
        return cb(null, "./uploads")
    },
    filename: function(req, file,cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload= multer({storage: storage})
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get('/', (req, res)=>{
    return res.render("homepage");
})

app.post("/upload", upload.fields([{name: 'resume'},{name: 'profile'}]), (req,res)=>{
    console.log(req.body);
    console.log(req.files);

    return res.redirect("/");
})

app.listen(port, ()=> console.log(`server started at PORT: ${port}`)); 