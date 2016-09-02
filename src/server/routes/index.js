const express = require('express');
const router = express.Router();
const db = require('../db/connection');

const indexController = require('../controllers/index');

router.get('/contacts', function (req, res, next) {

  if (req.query.first_name) {
    const query = req.query.first_name;
    const renderObject = {
      title:'Contacts:'
    };
    db.any(`SELECT * FROM contacts WHERE lower(first_name) LIKE '%${query}%'`, [true])
    .then((data) => {
      renderObject.data = data;
      res.render('contacts', renderObject);
    })
    .catch((error) => {
      next(error);
    });
  } else {
    const renderObject = {
      title:'Contacts'
    };

    db.any(`SELECT * FROM contacts`, [true])
    .then((data) => {
      renderObject.data = data;
      res.render('contacts', renderObject);
    })
    .catch((error) => {
      next(error);
    });
  }
});

router.get('/contacts/:id', function (req, res, next) {

  const renderObject = {
    title:'Contacts'
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

router.post('/contacts', (req, res, next) => {

  db.any(`INSERT INTO contacts (first_name, last_name, dob, eye_color, telephone_number) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.dob}', '${req.body.eye_color}', '${req.body.telephone_number}')`, [true])
  .then((data) => {
    res.redirect('http://localhost:3000/contacts');
  })
  .catch((error) => {
    next(error);
  });
});

module.exports = router;
