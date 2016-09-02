const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const names = require('../lib/data.js');

const indexController = require('../controllers/index');

router.get('/', function (req, res, next) {

  var dbCreated;

  db.any(`SELECT * FROM contacts`, [true])
  .then((data) => {
    if (data.length) {
      res.send({
        status: 'Error',
        message: 'Database alread created!'
      });
    } else {
      names.all.forEach((item) => {
        db.any(`INSERT INTO contacts (first_name, last_name, dob, eye_color, telephone_number) VALUES ('${item.first_name}', '${item.last_name}', '${item.date_of_birth}', '${item.eye_color}', '${item.telephone_number}')`, [true])
        .then((data) => {
          res.send({
            message: 'database created!'
          });
        })
        .catch((error) => {
          next(error);
        });
      });
    }
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
