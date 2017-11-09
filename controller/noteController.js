var store = require("../services/noteStore.js");

module.exports.createNewNote = function (req, res) {
    res.render("note_detail.hbs", { title: "Note Pro - Create New Note"} );
}

module.exports.saveNote = function (req, res) {
    store.add(req.body.title, req.body.descr, req.body.importance, req.body.doneuntil, req.body.complete, function(err, newDoc) {
        res.redirect('/showNotes');
    });
}

module.exports.sortNote = function (req, res) {
    switch(req.query.sortBy) {
        case "importance":
            store.sortImp( function (err, data) {
                    res.render("showNotes.hbs", { note: data })
                }
            )
            break;
        case "doneuntil":
            store.sortDat( function (err, data) {
                    res.render("showNotes.hbs", { note: data })
                }
            )
            break;
        default:
            store.all(
                function (err, data) {
                    res.render("showNotes.hbs", { note: data } );
                }
            );
            break;
    }
}

module.exports.editNote = function (req, res) {
    store.read(req.query.noteID, function (err, data) {
        res.render("note_detail.hbs", { note: data });
        console.log(data);
    });
}

module.exports.updateNote = function (req, res) {
    store.update(req.query.noteID, req.body.title, req.body.descr, req.body.importance, req.body.doneuntil, req.body.complete, function(err, newDoc) {
        res.redirect('/showNotes');
    });
}

module.exports.deleteNote = function (req, res) {
    store.delete(req.query.noteID, function (err, data) {
        res.redirect("/showNotes");
    });
}