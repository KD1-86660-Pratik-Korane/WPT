const express=require('express');
const db=require('../db');
const utils=require('../utils');
const router=express.Router();
const config=require('../config');
const verifyToken = require('../middleware/authMiddleware');
//verify token is a dependency injection used to check the token is valid or not
router.get('/',verifyToken,(req,res)=>{
    const statement=`select * from bookings;`
    db.pool.query(statement,(error,bookings)=>{
        res.send(utils.createResult(error,bookings));
    })
});

router.post('/:userId',(req,res)=>{
    const {propertyId, total, fromDate, toDate}=req.body;
    const statement=`insert into bookings (userId, propertyId, total, fromDate, toDate) values (?,?,?,?,?);`
    db.pool.query(statement,[req.params.userId,propertyId,total,fromDate,toDate],(error,bookings)=>{
        res.send(utils.createResult(error,bookings));
    });
});

module.exports=router;