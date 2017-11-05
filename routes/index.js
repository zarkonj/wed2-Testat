var express = require('express');
var noteController = require('../controller/noteController');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/create", noteController.shipiChopf);
router.post("/create", noteController.saveNote);
module.exports = router;
