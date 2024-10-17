const express=require('express');
const db=require('../db');
const utils=require('../utils');

const multer=require('multer');

const upload = multer({ dest: 'images/' });
const router=express.Router();

router.get('/',(req,res)=>{
    const statement=`select id,title,details,image from category;`
    db.pool.query(statement,(error,categories)=>{
        res.send(utils.createResult(error,categories));
    })
});

router.post('/',upload.single('icon'),(req,res)=>{
    const {title,details}=req.body;

    const fileName=req.file.filename;
    

    const statement=`insert into  category(title,details,image) values(?,?,?);`
    db.pool.execute(statement,[title,details,fileName],(error,categories)=>{
        res.send(utils.createResult(error,categories));
    })
})

module.exports=router;