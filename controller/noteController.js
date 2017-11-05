var store = require("../services/noteStore.js");

module.exports.shipiChopf = function (req, res) {
    res.render("note_detail.hbs", { title: "Shipichopf"} );
}

module.exports.saveNote = function (req, res) {
    var note = store.add(req.body.title, req.body.descr, req.body.importance, false, function(err, newDoc) {
        res.redirect('/');
    });
}

module.exports.printNote = function (req, res) {
    store.get(req.params.title, req.params.descr, req.params.importance, reg.params.complete, function(err, newDoc) {
        res.format({
            'text/html': function(){
                res.render("printNote", newDoc);
            }
        })
    });
}