let express = require('express');

let store = require("../services/noteStore.js");
let moment = require('moment');
moment.locale("de");//.format('LLL');
let sortOrderValue = 1;


module.exports.showNotes = function (req, res) {
    store.all(function (err, notes) {
        notes = sortNote(req.session.order, notes);
        notes = setDoneUntil(notes);

        res.render("showNotes", {title: "Note Pro", style: req.session.changeStyle, note: notes})
    })
};

module.exports.createNewNote = function (req, res) {
    res.render("note_detail.hbs", {title: "Create New Note", changeStyle: getChangeStyle(req)});
};

module.exports.saveNote = function (req, res) {
    store.add(req.body.title, req.body.descr, req.body.importance, req.body.doneuntil, req.body.complete, function (err, newDoc) {
        res.redirect('/showNotes');
    });
};

module.exports.sortNote = function (req, res) {
    res.redirect('/')


    /*    switch (req.query.sortBy) {
            case "importance":
                if (req.query.sortOrder) {
                    sortOrderValue = 1;
                } else {
                    sortOrderValue = -1;
                }
                store.sortImp(sortOrderValue, function (err, data) {
                        if (req.query.hideNotes) {
                            data = data.filter(function (obj) {
                                return (!obj.complete);
                            })
                        }

                        res.render("showNotes.hbs", {note: data, query: req.query, changeStyle: getChangeStyle(req)});
                    }
                );
                break;
            case "doneuntil":
                if (req.query.sortOrder) {
                    sortOrderValue = 1;
                } else {
                    sortOrderValue = -1;
                }
                store.sortDat(sortOrderValue, function (err, data) {
                        if (req.query.hideNotes) {
                            data = data.filter(function (obj) {
                                return (!obj.complete);
                            })
                        }

                        res.render("showNotes.hbs", {note: data, query: req.query, changeStyle: getChangeStyle(req)});
                    }
                );
                break;
            default:
                store.all(
                    function (err, data) {
                        if (req.query.hideNotes) {
                            data = data.filter(function (obj) {
                                return (!obj.complete);
                            })
                        }

                        res.render("showNotes.hbs", {note: data, query: req.query, changeStyle: getChangeStyle(req)});
                    }
                );
                break;
        }*/
};

module.exports.editNote = function (req, res) {
    store.read(req.query.noteID, function (err, data) {
        res.render("note_detail.hbs", {title: "Change Note", note: data, changeStyle: getChangeStyle(req)});
        console.log(data);
    });
};

module.exports.updateNote = function (req, res) {
    store.update(req.query.noteID, req.body.title, req.body.descr, req.body.importance, req.body.doneuntil, req.body.complete, function (err, newDoc) {
        res.redirect('/showNotes');
    });
};

module.exports.deleteNote = function (req, res) {
    store.delete(req.query.noteID, function (err, data) {
        res.redirect("/showNotes");
    });
};

module.exports.hideNote = function (req, res) {
    store.all(
        function (err, data) {
            res.render("showNotes.hbs", {note: data, hide: req.query.hideNotes});
        }
    )
};

module.exports.invertChangeStyle = function (req, res) {
    req.session.changeStyle = !req.session.changeStyle;
    res.redirect('/');
};

function sortNote(order, notes) {
    return notes;
}

function setDoneUntil(notes) {
    notes.forEach(function (note) {
        let date = moment(note.doneuntil, "YYYY-MM-DD");
        note.doneuntil = "";
        if (moment(date, "YYYY-MM-DD") < moment()) {
            note.doneuntil = moment(date, "YYYY-MM-DD").toNow();
        }
        note.doneuntil = moment(date, "YYYY-MM-DD").fromNow();
    });
    return notes;
}


function getChangeStyle(request) {
    return request.session.changeStyle;
}
