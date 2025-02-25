const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/trains.json'); // Оновлений шлях

console.log(`📌 Шлях до trains.json: ${filePath}`);

// Функція для читання потягів з JSON
const loadTrains = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        console.log("📖 Дані з файлу:", data);
        return JSON.parse(data);
    } catch (err) {
        console.error("❌ ПОМИЛКА читання файлу!", err);
        return [];
    }
};

// Функція для збереження потягів у JSON
const saveTrains = (trains) => {
    try {
        fs.writeFileSync(filePath, JSON.stringify(trains, null, 2));
        console.log("✅ Потяги успішно збережено!");
    } catch (err) {
        console.error("❌ ПОМИЛКА збереження файлу!", err);
    }
};

exports.getAll = () => {
    console.log("📢 Викликано getAll()");
    return loadTrains();
};

exports.addTrain = (train) => {
    console.log("📢 Викликано addTrain() з даними:", train);
    const trains = loadTrains();
    train.id = trains.length ? trains[trains.length - 1].id + 1 : 1;
    trains.push(train);
    saveTrains(trains);
};

exports.deleteTrain = (id) => {
    console.log(`📢 Видалення потяга ID: ${id}`);
    let trains = loadTrains();

    id = Number(id);  

    const initialLength = trains.length;
    trains = trains.filter(train => train.id !== id);

    if (trains.length === initialLength) {
        console.error("❌ ПОМИЛКА: Потяг з таким ID не знайдено!");
        return false;
    }

    saveTrains(trains);
    console.log("✅ Потяг успішно видалено!");
    return true;
};


exports.search = (from, to) => {
    console.log(`📢 Викликано пошук потягів: з ${from} до ${to}`);
    const trains = loadTrains();

    return trains.filter(train => 
        train.from.toLowerCase() === from.toLowerCase() &&
        train.to.toLowerCase() === to.toLowerCase()
    );
};
