const express = require('express');
const router = express.Router();

router.post('/draw', (req,res) =>{
    res.send('draw created');
});

router.post('/dashboard', (req,res) =>{
    res.send('dashboard page');
});

module.exports = router;