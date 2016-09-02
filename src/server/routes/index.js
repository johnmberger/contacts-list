const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const indexController = require('../controllers/index');

router.get('/contacts', function (req, res, next) {

  const renderObject = {
    title:'Listing All People'
  };

  db.any(`SELECT * FROM contacts`, [true])
  .then((data) => {
    renderObject.data = data;
    res.render('contacts', renderObject);
  })
  .catch((error) => {
    next(error);
  });
});

router.get('/contacts/:id', function (req, res, next) {

  const renderObject = {
    title:'Listing One Person'
  };

  const contactID = req.params.id;

  db.any(`SELECT * FROM contacts WHERE id = ${contactID}`, [true])
  .then((data) => {
    renderObject.data = data;
    res.render('contacts', renderObject);
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
