let express = require('express');

let store = require("../services/noteStore.js");
let sortOrderValue = 1;

module.exports.createNewNote = function (req, res) {
    res.render("note_detail.hbs", {title: "Create New Note", changeStyle: getChangeStyle(req)});
};

module.exports.saveNote = function (req, res) {
    store.add(req.body.title, req.body.descr, req.body.importance, req.body.doneuntil, req.body.complete, function (err, newDoc) {
        res.redirect('/showNotes');
    });
};

module.exports.sortNote = function (req, res) {
    if(req.query.changeStyle !== undefined) {
        setChangeStyle(req, req.query.changeStyle);
    }

    switch (req.query.sortBy) {
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
            )
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
            )
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
    }
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

function getChangeStyle(request) {
    return request.session.changeStyle;
}

function setChangeStyle(request, changeStyle) {
    request.session.changeStyle = changeStyle;
}