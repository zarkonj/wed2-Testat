let express = require('express');
let noteController = require('../controller/noteController');
let router = express.Router();

/* GET home page.
router.get('/', noteController.sortNote, function (req, res, next) {
    res.render('showNotes', {title: "Note Pro"});
});*/

router.get("/", noteController.showNotes);

router.get("/create", noteController.createNewNote);
router.get("/editNote", noteController.editNote);
router.get("/deleteNote", noteController.deleteNote);
router.get("/hideNotes", noteController.invertHideNote);
router.get("/changeStyle", noteController.invertChangeStyle);
router.get("/sort/:order/",noteController.sortNotes);

router.post("/create", noteController.saveNote);
router.post("/editNote", noteController.updateNote);

module.exports = router;
