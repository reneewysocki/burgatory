var express = require("express");

var router = express.Router();

// Import the model to use its database functions.
var burger = require("../models/burger.js");

router.get('/', (req, res) => {
    burger.all((data) => {
        var hbsObject = {
            burgers: data
        };
        // console.log(hbsObject);
        res.render("index", hbsObject);
    })
})

router.post('/api/burgers', (req, res) => { 
    burger.create([req.body.name], (result) => {
        res.json({ id: result.insertId});
    })
})

router.put('/api/burgers/:id', (req, res)=> {
    var condition = "id =" + req.params.id; 
    console.log(condition)

    burger.update(req.body, condition, (result)=> {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

router.delete('/api/burgers/:id', (req, res)=> {
    var condition = "id = " + req.params.id;

    burger.delete(condition, function(result) {
        if (result.affectedRows == 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
})

// Export routes for server.js to use.
module.exports = router;