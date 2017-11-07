var store = require("../services/noteStore.js");

module.exports.createNewNote = function (req, res) {
    res.render("note_detail.hbs", { title: "Note Pro - Create New Note"} );
}

module.exports.saveNote = function (req, res) {
    var note = store.add(req.body.title, req.body.descr, req.body.importance, req.body.doneuntil, false, function(err, newDoc) {
        res.redirect('/');
    });
}

module.exports.printNote = function (req, res) {
    store.get(req.params.title, req.params.descr, req.params.importance, req.params.doneuntil, reg.params.complete, function(err, newDoc) {
        res.format({
            'text/html': function(){
                res.render("printNote", newDoc);
            }
        })
    });
}