const express = require("express");
const db = require("../db");
const utils = require("../utils");
const router = express.Router();

router.get("/", (req, res) => {
  const statement = `select id,title,details,rent,profileImage from property;`;
  db.pool.query(statement, (error, properties) => {
    res.send(utils.createResult(error, properties));
  });
});

router.get("/details/:id", (req, res) => {
  const { id } = req.params;
  const statement = `select * from property where id=?;`;
  db.pool.query(statement, [id], (error, properties) => {
    res.send(utils.createResult(error, properties[0]));
  });
});

router.post("/", (req, res) => {
  const {
    categoryId,
    title,
    details,
    address,
    contactNo,
    ownerName,
    isLakeView,
    isTV,
    isAC,
    isWifi,
    isMiniBar,
    isBreakfast,
    isParking,
    guests,
    bedrooms,
    beds,
    bathrooms,
    rent
  } = req.body;

  const query = `insert into property (categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,
    isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent) values
    (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`
  db.pool.execute(
    query,
    [ categoryId,
      title,
      details,
      address,
      contactNo,
      ownerName,
      isLakeView,
      isTV,
      isAC,
      isWifi,
      isMiniBar,
      isBreakfast,
      isParking,
      guests,
      bedrooms,
      beds,
      bathrooms,
      rent
    ],
    (error, result) => {
      res.send(utils.createResult(error, result));
    }
  );
});

module.exports = router;
