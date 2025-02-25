const Train = require('../models/Train.js'); 

exports.searchTrains = (req, res) => {
    const { from, to } = req.query;
    console.log("📢 Викликано пошук потягів:", from, to);

    if (!from || !to) {
        return res.render('search', { results: [], from, to });
    }

    const results = Train.search(from, to);
    res.render('search', { results, from, to }); 
};

exports.getAllTrains = (req, res) => {
    const trains = Train.getAll(); 
    res.render('trains/index', { trains });
};