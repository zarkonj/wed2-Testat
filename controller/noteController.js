let express = require('express');
let store = require("../services/noteStore.js");
let moment = require('moment');
moment.locale("de");

let reverseSort = false;
//let sortOrderValue = 1;


module.exports.showNotes = function (req, res) {
    store.all(function (err, notes) {
        notes = sortData(req.session.order, notes);
        notes = hideNotes(req.session.hideNote, notes);
        notes = setDoneUntil(notes);

        res.render("showNotes", {title: "Note Pro", changeStyle : req.session.changeStyle, note: notes})
    })
};

module.exports.createNewNote = function (req, res) {
    res.render("note_detail.hbs", {title: "Create New Note", changeStyle: getChangeStyle(req)});
};

module.exports.saveNote = function (req, res) {
    store.add(req.body.title, req.body.descr, req.body.importance, req.body.doneuntil, req.body.complete, function (err, newDoc) {
        res.redirect('/');
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
        res.redirect('/');
    });
};

module.exports.deleteNote = function (req, res) {
    store.delete(req.query.noteID, function (err, data) {
        res.redirect("/");
    });
};

module.exports.invertHideNote = function (req, res) {
    req.session.hideNote = !req.session.hideNote;
    res.redirect('/');


};

module.exports.invertChangeStyle = function (req, res) {
    if(req.session.changeStyle === undefined) {req.session.changeStyle = false;}
    req.session.changeStyle = !req.session.changeStyle;
    res.redirect('/');
};

module.exports.sortNotes = function (req, res) {
    if (req.params.order) {
        if (req.params.order === req.session.order) {
            reverseSort = !reverseSort;
        } else {
            reverseSort = false;
            req.session.order = req.params.order;
        }
    } else {
        req.session.order = "doneuntil";
    }
    res.redirect('/');
};

function sortData(order, notes) {
    switch (order) {
        case 'importance' :
            notes.sort(function (note1, note2) {
                return sortOrder(note1.importance, note2.importance);
            });
            break;
        case 'doneuntil':
            notes.sort(function(note1, note2) {
                return sortOrder(moment(note1.doneuntil, "YYYY-MM-DD"), moment(note2.doneuntil, "YYYY-MM-DD"));
            });
            break;
    }
    return notes;
}


function sortOrder(val1, val2) {
    if (reverseSort) {
        return val1 > val2 ? -1 : 1;
    } else {
        return val1 > val2 ? 1 : -1;
    }
}


function hideNotes(hideNote, notes) {
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
