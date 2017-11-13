var express = require('express');
var noteController = require('../controller/noteController');
var router = express.Router();

/* GET home page. */
router.get('/', noteController.sortNote, function(req, res, next) {
  res.render('showNotes', { title: "Note Pro" });
});

router.get("/create", noteController.createNewNote);
router.post("/create", noteController.saveNote);
router.get("/showNotes", noteController.sortNote);
router.get("/editNote", noteController.editNote);
router.post("/editNote", noteController.updateNote);
router.get("/deleteNote", noteController.deleteNote);
router.get("/hidingNotes", noteController.hideNote);
module.exports = router;
