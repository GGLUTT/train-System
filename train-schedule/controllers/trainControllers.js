const Train = require('../models/Train.js'); // ✅ Впевнись, що правильно підключено

exports.searchTrains = (req, res) => {
    const { from, to } = req.query;
    console.log("📢 Викликано пошук потягів:", from, to);

    if (!from || !to) {
        return res.render('search', { results: [], from, to });
    }

    const results = Train.search(from, to);
    res.render('search', { results, from, to }); // ✅ Має бути 'search', без '.ejs'
};

exports.getAllTrains = (req, res) => {
    const trains = Train.getAll(); // Переконайтеся, що getAll() існує в моделі
    res.render('trains/index', { trains });
};