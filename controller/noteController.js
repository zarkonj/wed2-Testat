var store = require("../services/noteStore.js");

module.exports.createNewNote = function (req, res) {
    res.render("note_detail.hbs", { title: "Note Pro - Create New Note"} );
}

module.exports.saveNote = function (req, res) {
    store.add(req.body.title, req.body.descr, req.body.importance, req.body.doneuntil, false, function(err, newDoc) {
        res.redirect('/showNotes');
    });
}

module.exports.printNote = function (req, res) {
    store.all(
        function (err, data) {
            res.render("showNotes.hbs", { note: data } );
        }
    );
}