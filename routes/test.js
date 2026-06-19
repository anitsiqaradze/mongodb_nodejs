var express = require('express');
var router = express.Router();

router.post('/save', (req, res) => {
    const body = req.body;

    console.log("body params", body);
    body.serverMessage = 'hello from server';

    res.json(body);
});

router.get('/info/:id', (req, res) => {
    console.log("params", req.params);
    console.log("query", req.query);

    res.json({
        uni: 'ibsu',
        students: []
    })
});


router.get('/error', (req, res) => {
    res.status(400).json({ message: 'required fields are missing' });
});

module.exports = router;