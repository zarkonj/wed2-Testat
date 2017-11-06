var express = require('express');
var noteController = require('../controller/noteController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Note Pro' });
});

router.get("/create", noteController.createNewNote);
router.post("/create", noteController.saveNote);
module.exports = router;
