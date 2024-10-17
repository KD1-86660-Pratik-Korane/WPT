const express = require("express");
const db = require("../db");
const utils = require("../utils");
const router = express.Router();
const jwt=require('jsonwebtoken');
const config=require('../config');

router.put("/profile/:id", (req, res) => {
  const {firstName, lastName, phoneNumber } = req.body;

  const statement = `UPDATE user SET firstName = ?, lastName = ?, phoneNumber = ? WHERE id = ?`;
  db.pool.execute(
    statement,
    [firstName, lastName, phoneNumber, req.params.id],
    (error, result) => {
      res.send(utils.createResult(error, result));
    }
  );
});

router.get('/profile/:id',(req,res)=>{
  const statement=`select firstName,lastName,phoneNumber,email from user where id=?`
  db.pool.execute(statement,[req.params.id],(error,result)=>{
    res.send(utils.createResult(error,result));
  })
})

router.post("/register", (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  const statement = `INSERT INTO user (firstName, lastName, email, password, phoneNumber) VALUES (?, ?, ?, ?, ?)`;
  db.pool.execute(
    statement,
    [firstName, lastName, email, password, phone],
    (error, result) => {
      res.send(utils.createResult(error, result));
    }
  );
});
 
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const statement =
    "select id , firstName , lastName, phoneNumber, isDeleted from user where email = ? and password = ?";
    //const encryptedPassword= String(crypto.SHA256(password));
    //db.pool.query(statement,[email,encryptedPassowrd],(error,users)=>{})

  db.pool.query(statement, [email, password], (error, users) => {
    if (error) {
      res.send(utils.createErrorResult(error));
    } else {
      if (users.length == 0) {
        res.send(utils.createErrorResult("user does not exists"));
      } else {
        const user = users[0];
        if (user.isDeleted) {
          res.send(utils.createErrorResult("your account is closed"));
        } else {
          const payload = { id: user.id };
          const token=jwt.sign(payload,config.secret);
          const userData = {
            token,
            name: `${user["firstName"]} ${user["lastName"]}`,
          };
          res.send(utils.createSuccessResult(userData));
        }
      }
    }
  });
});

module.exports = router;
